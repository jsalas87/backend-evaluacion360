const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  period: { type: String, required: true },
  type: { type: String, required: true },
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
