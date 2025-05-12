const mongoose = require('mongoose');
const { Schema } = mongoose;

const BuildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  processor: {
    type: Schema.Types.ObjectId,
    ref: 'Processor'
  },
  gpu: {
    type: Schema.Types.ObjectId,
    ref: 'Gpu'
  },
  motherboard: {
    type: Schema.Types.ObjectId,
    ref: 'Motherboard'
  },
  ram: {
    type: Schema.Types.ObjectId,
    ref: 'Ram'
  },
  ssd: {
    type: Schema.Types.ObjectId,
    ref: 'SSD'
  },
  case: {
    type: Schema.Types.ObjectId,
    ref: 'Case'
  },
  psu: {
    type: Schema.Types.ObjectId,
    ref: 'PSU'
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