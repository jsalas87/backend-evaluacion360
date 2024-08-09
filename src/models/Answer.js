const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  response: { type: String, required: true }
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
  answerSchema,
  Answer
}
