const mongoose = require('mongoose');
const { answerSchema }= require('../models/Answer');

const evaluationEmployeeSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  evaluation: { type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation', required: true },
  state: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  questions: { type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true}] },
  answers: { type: [answerSchema], required: false },
  score : {type : Number, default: 0}
});

const EvaluationEmployee = mongoose.model('EvaluationEmployee', evaluationEmployeeSchema);

module.exports = EvaluationEmployee
