const { Schema, model } = require('mongoose')

const requestSchema = new Schema({
  requesterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['blood','organ'], required: true },
  bloodType: String,
  organ: String,
  radiusKm: Number,
  urgency: { type: String, enum: ['low','normal','high','emergency'], default: 'normal' },
  description: String,
  hospitalName: String,
  doctorName: String,
  contactPhone: String,
  status: { type: String, enum: ['PENDING','VERIFIED','APPROVED','MATCHED','COMPLETED','REJECTED','IGNORED'], default: 'PENDING' },
}, { timestamps: true })

module.exports = model('Request', requestSchema)
