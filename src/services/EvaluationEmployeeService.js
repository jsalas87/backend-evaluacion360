const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const EvaluationEmployee = require('../models/EvaluationEmployee');
const { Answer } = require('../models/Answer');

const evaluateEmployee = async (evaluationId, request) => {
    let answersEmployee = request.map(({ question, response }) => ({
        question: new ObjectId(question),
        response,
    }));

    let evaluationEmployee = await EvaluationEmployee.findById(evaluationId).populate('questions');
    if (!evaluationEmployee) throw new Error('Evaluation of employee not found');

    const questionIds = answersEmployee.map(ans => ans.question);

    const correctAnswers = await Answer.find({ question: { $in: questionIds } });

    const correctAnswerMap = correctAnswers.reduce((map, answer) => {
        map[answer.question.toString()] = answer.response;
        return map;
    }, {});

    let point = 0;
    answersEmployee.forEach(answerEmp => {
        if (correctAnswerMap[answerEmp.question.toString()] === answerEmp.response) {
            point += 1;
        }
    });

    evaluationEmployee.answers = answersEmployee;
    evaluationEmployee.score = (point * 100) / evaluationEmployee.questions.length;

    await evaluationEmployee.save();
    return evaluationEmployee;
};

module.exports = { evaluateEmployee };
