const jwt = require('jsonwebtoken')

module.exports = function auth(required = false) {
  return (req, res, next) => {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) {
      if (required) return res.status(401).json({ error: 'Unauthorized' })
      return next()
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev')
      req.user = { id: payload.sub, role: payload.role }
      next()
    } catch (e) {
      if (required) return res.status(401).json({ error: 'Unauthorized' })
      next()
    }
  }
}
