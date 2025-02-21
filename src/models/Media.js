import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);