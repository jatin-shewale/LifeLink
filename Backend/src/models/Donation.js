const { Schema, model } = require('mongoose')

const donationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['blood','organ'], required: true },
  bloodType: String,
  organ: String,
  date: { type: Date, required: true },
  address: String,
  notes: String,
}, { timestamps: { createdAt: true, updatedAt: false } })

module.exports = model('Donation', donationSchema)
