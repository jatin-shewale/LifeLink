const { Router } = require('express')
const Request = require('../models/Request')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = Router()

// Search available donors by availability and compatibility (no name search)
router.get('/search', auth(true), async (req, res) => {
  const { type, bloodType, organ } = req.query
  const filter = { role: 'donor' }
  if (type === 'blood') {
    filter['availability.bloodAvailable'] = true
    if (bloodType) filter.bloodType = bloodType
  }
  if (type === 'organ') {
    filter['availability.organsAvailable'] = { $in: [organ] }
  }
  const donors = await User.find(filter).select('name email bloodType availability organPledge')
  res.json(donors)
})

router.get('/requests', auth(true), async (req, res) => {
  const items = await Request.find({ requesterId: req.user.id }).sort({ createdAt: -1 })
  res.json(items)
})

router.post('/requests', auth(true), async (req, res) => {
  try {
    const { type, bloodType, organ, radiusKm, urgency, description, hospitalName, doctorName, contactPhone } = req.body
    const created = await Request.create({ requesterId: req.user.id, type, bloodType, organ, radiusKm, urgency, description, hospitalName, doctorName, contactPhone })
    req.app.get('io')?.emit('request:new', created)
    res.status(201).json(created)
  } catch (e) {
    res.status(400).json({ error: 'Invalid request data' })
  }
})

module.exports = router
