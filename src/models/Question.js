const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['open', 'multiple-choice'], required: true },
  options: { type: [String] }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
