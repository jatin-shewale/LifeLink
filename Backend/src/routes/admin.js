const { Router } = require('express')
const User = require('../models/User')
const Request = require('../models/Request')
const Donation = require('../models/Donation')
const auth = require('../middleware/auth')

const router = Router()

const adminAuth = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin access required' })
  next()
}

// Dashboard Overview with comprehensive statistics
router.get('/overview', auth(true), adminAuth, async (req, res) => {
  try {
    const [
      totalUsers,
      totalDonations,
      totalRequests,
      pendingRequests,
      emergencyRequests,
      bloodInventory,
      organInventory,
      recentActivity
    ] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Request.countDocuments(),
      Request.countDocuments({ status: 'PENDING' }),
      Request.countDocuments({ urgency: 'emergency' }),
      Donation.aggregate([
        { $match: { type: 'blood' } },
        { $group: { _id: '$bloodType', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Donation.aggregate([
        { $match: { type: 'organ' } },
        { $group: { _id: '$organ', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Request.find()
        .populate('requesterId', 'name email')
        .sort({ createdAt: -1 })
        .limit(10)
    ])

    res.json({
      users: totalUsers,
      donations: totalDonations,
      requests: totalRequests,
      pendingRequests,
      emergencyRequests,
      bloodInventory,
      organInventory,
      recentActivity
    })
  } catch (error) {
    console.error('Error fetching overview:', error)
    res.status(500).json({ error: 'Failed to fetch overview data' })
  }
})

// List all recipient requests with enhanced filtering
router.get('/requests', auth(true), adminAuth, async (req, res) => {
  try {
    const { status, urgency, type } = req.query
    const filter = {}
    
    if (status) filter.status = status
    if (urgency) filter.urgency = urgency
    if (type) filter.type = type

    const items = await Request.find(filter)
      .populate('requesterId', 'name email bloodType role phone')
      .sort({ createdAt: -1 })
    
    res.json(items)
  } catch (error) {
    console.error('Error fetching requests:', error)
    res.status(500).json({ error: 'Failed to fetch requests' })
  }
})

// Get emergency requests
router.get('/emergency', auth(true), adminAuth, async (req, res) => {
  try {
    const emergencyRequests = await Request.find({ 
      $or: [{ urgency: 'emergency' }, { status: 'PENDING' }] 
    })
      .populate('requesterId', 'name email phone')
      .sort({ createdAt: -1 })
    
    res.json(emergencyRequests)
  } catch (error) {
    console.error('Error fetching emergency requests:', error)
    res.status(500).json({ error: 'Failed to fetch emergency requests' })
  }
})

// Update request status with inventory check
router.patch('/requests/:id/status', auth(true), adminAuth, async (req, res) => {
  try {
    const { status } = req.body
    if (!['PENDING','VERIFIED','APPROVED','MATCHED','COMPLETED','REJECTED','IGNORED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    const request = await Request.findById(req.params.id).populate('requesterId', 'name email')
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    // Check inventory availability before approving
    if (status === 'APPROVED') {
      let isAvailable = false
      
      if (request.type === 'blood') {
        // Check blood inventory
        const bloodCount = await Donation.countDocuments({ 
          type: 'blood', 
          bloodType: request.bloodType 
        })
        isAvailable = bloodCount > 0
      } else if (request.type === 'organ') {
        // Check organ inventory
        const organCount = await Donation.countDocuments({ 
          type: 'organ', 
          organ: request.organ 
        })
        isAvailable = organCount > 0
      }

      if (!isAvailable) {
        return res.status(400).json({ 
          error: 'Insufficient inventory', 
          message: `${request.type === 'blood' ? request.bloodType + ' blood' : request.organ} is currently out of stock` 
        })
      }
    }

    const updated = await Request.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('requesterId', 'name email')

    // Emit notification to recipient
    req.app.get('io')?.emit('request:status', { 
      id: req.params.id, 
      status,
      recipientId: updated.requesterId._id,
      message: `Your ${updated.type} request has been ${status.toLowerCase()}`
    })

    // If approved, also emit a general notification and update inventory
    if (status === 'APPROVED') {
      req.app.get('io')?.emit('request:approved', {
        requestId: req.params.id,
        type: updated.type,
        bloodType: updated.bloodType,
        organ: updated.organ,
        urgency: updated.urgency
      })

      // Update inventory (mark one donation as used)
      if (updated.type === 'blood') {
        const donation = await Donation.findOne({ 
          type: 'blood', 
          bloodType: updated.bloodType 
        })
        if (donation) {
          await Donation.findByIdAndDelete(donation._id)
        }
      } else if (updated.type === 'organ') {
        const donation = await Donation.findOne({ 
          type: 'organ', 
          organ: updated.organ 
        })
        if (donation) {
          await Donation.findByIdAndDelete(donation._id)
        }
      }
    }

    res.json(updated)
  } catch (error) {
    console.error('Error updating request status:', error)
    res.status(500).json({ error: 'Failed to update request status' })
  }
})

// Notify recipient: no availability
router.post('/requests/:id/notify-unavailable', auth(true), adminAuth, async (req, res) => {
  try {
    const item = await Request.findById(req.params.id).populate('requesterId', 'name email')
    if (!item) return res.status(404).json({ error: 'Request not found' })
    
    req.app.get('io')?.emit('request:unavailable', { 
      id: item.id,
      recipientId: item.requesterId._id,
      message: `Unfortunately, no ${item.type} donors are currently available for your request`
    })
    
    res.json({ ok: true })
  } catch (error) {
    console.error('Error notifying unavailable:', error)
    res.status(500).json({ error: 'Failed to send notification' })
  }
})

// Check inventory availability for a specific request
router.get('/requests/:id/inventory-check', auth(true), adminAuth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    let inventory = {
      available: false,
      count: 0,
      type: request.type,
      item: request.type === 'blood' ? request.bloodType : request.organ
    }

    if (request.type === 'blood') {
      const count = await Donation.countDocuments({ 
        type: 'blood', 
        bloodType: request.bloodType 
      })
      inventory.count = count
      inventory.available = count > 0
    } else if (request.type === 'organ') {
      const count = await Donation.countDocuments({ 
        type: 'organ', 
        organ: request.organ 
      })
      inventory.count = count
      inventory.available = count > 0
    }

    res.json(inventory)
  } catch (error) {
    console.error('Error checking inventory:', error)
    res.status(500).json({ error: 'Failed to check inventory' })
  }
})

// Get all users with filtering
router.get('/users', auth(true), adminAuth, async (req, res) => {
  try {
    const { role, search } = req.query
    const filter = {}
    
    if (role) filter.role = role
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
    
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Delete user
router.delete('/users/:id', auth(true), adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: 'Cannot delete your own account' })
    }

    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

// Get detailed statistics
router.get('/statistics', auth(true), adminAuth, async (req, res) => {
  try {
    const [
      bloodStats,
      organStats,
      weeklyData,
      monthlyData,
      userStats
    ] = await Promise.all([
      // Blood type statistics
      Donation.aggregate([
        { $match: { type: 'blood' } },
        { $group: { _id: '$bloodType', available: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      // Organ statistics
      Donation.aggregate([
        { $match: { type: 'organ' } },
        { $group: { _id: '$organ', available: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      // Weekly activity data
      Donation.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            donations: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      // Monthly data
      Donation.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            donations: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]),
      // User role statistics
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ])
    ])

    res.json({
      bloodStats,
      organStats,
      weeklyData,
      monthlyData,
      userStats
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    res.status(500).json({ error: 'Failed to fetch statistics' })
  }
})

// Get donation history
router.get('/donations', auth(true), adminAuth, async (req, res) => {
  try {
    const { type, bloodType, organ } = req.query
    const filter = {}
    
    if (type) filter.type = type
    if (bloodType) filter.bloodType = bloodType
    if (organ) filter.organ = organ

    const donations = await Donation.find(filter)
      .populate('userId', 'name email bloodType')
      .sort({ createdAt: -1 })
    
    res.json(donations)
  } catch (error) {
    console.error('Error fetching donations:', error)
    res.status(500).json({ error: 'Failed to fetch donations' })
  }
})

// Get recent activity
router.get('/activity', auth(true), adminAuth, async (req, res) => {
  try {
    const recentRequests = await Request.find()
      .populate('requesterId', 'name email')
      .sort({ createdAt: -1 })
      .limit(20)

    const recentDonations = await Donation.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(20)

    const activity = [
      ...recentRequests.map(req => ({
        type: 'request',
        id: req._id,
        user: req.requesterId,
        data: req,
        timestamp: req.createdAt
      })),
      ...recentDonations.map(don => ({
        type: 'donation',
        id: don._id,
        user: don.userId,
        data: don,
        timestamp: don.createdAt
      }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 20)

    res.json(activity)
  } catch (error) {
    console.error('Error fetching activity:', error)
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

module.exports = router