const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["donor", "recipient", "admin"],
      required: true,
    },
    bloodType: String,
    organPledge: { type: [String], default: [] },
    availability: {
      bloodAvailable: { type: Boolean, default: false },
      organsAvailable: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
