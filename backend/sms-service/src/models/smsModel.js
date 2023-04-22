import mongoose from 'mongoose';

const smsSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
    },
    sender_id: {
      type: String,
      required: true,
      default: 'Red Stream',
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sms = mongoose.model('Sms', smsSchema);

export default Sms;
