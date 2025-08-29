const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role, bloodType, organPledge } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: 'Email already in use' })
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ email, password: hashed, name, role, bloodType, organPledge })
    res.json({ id: user._id, email: user.email, name: user.name, role: user.role })
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ sub: String(user._id), role: user.role }, process.env.JWT_SECRET || 'dev', { expiresIn: '1h' })
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, role: user.role } })
  } catch (e) {
    res.status(500).json({ error: 'Login failed' })
  }
})

module.exports = router

// Return current user profile
router.get('/me', async (req, res) => {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev')
    const user = await User.findById(payload.sub).select('-password')
    if (!user) return res.status(404).json({ error: 'Not found' })
    res.json(user)
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' })
  }
})
