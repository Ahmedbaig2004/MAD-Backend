const mongoose = require('mongoose');
const { Schema } = mongoose;

const BuildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  processor: {
    type: Schema.Types.ObjectId,
    ref: 'processors'
  },
  gpu: {
    type: Schema.Types.ObjectId,
    ref: 'gpu'
  },
  motherboard: {
    type: Schema.Types.ObjectId,
    ref: 'motherboard'
  },
  ram: {
    type: Schema.Types.ObjectId,
    ref: 'ram'
  },
  ssd: {
    type: Schema.Types.ObjectId,
    ref: 'ssd'
  },
  case: {
    type: Schema.Types.ObjectId,
    ref: 'case'
  },
  psu: {
    type: Schema.Types.ObjectId,
    ref: 'psu'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Build', BuildSchema); 