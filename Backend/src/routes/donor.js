const { Router } = require('express')
const Donation = require('../models/Donation')
const auth = require('../middleware/auth')

const router = Router()

// Update donor availability
router.post('/availability', auth(true), async (req, res) => {
  const { bloodAvailable, organsAvailable } = req.body
  try {
    const updated = await require('../models/User').findByIdAndUpdate(
      req.user.id,
      { $set: { 'availability.bloodAvailable': !!bloodAvailable, 'availability.organsAvailable': Array.isArray(organsAvailable) ? organsAvailable : [] } },
      { new: true }
    )
    res.json({ availability: updated.availability })
  } catch (e) {
    res.status(400).json({ error: 'Failed to update availability' })
  }
})

router.get('/donations', auth(true), async (req, res) => {
  const items = await Donation.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(20)
  res.json(items)
})

router.post('/donations', auth(true), async (req, res) => {
  try {
    const { type, bloodType, organ, date, address, notes } = req.body
    const created = await Donation.create({ userId: req.user.id, type, bloodType, organ, date, address, notes })
    res.status(201).json(created)
  } catch (e) {
    res.status(400).json({ error: 'Invalid donation data' })
  }
})

module.exports = router
