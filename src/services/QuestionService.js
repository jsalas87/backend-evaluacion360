const { validationResult } = require('express-validator');
const Question = require('../models/Question');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');
const BadRequestError = require('../middlewares/BadRequestError');

exports.createQuestion = async (questionData) => {
    const errors = validationResult(questionData.req);
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    if (!errors.isEmpty()) {
        throw new BadRequestError(errorMessages);
    }

    const { text, type, options } = questionData.body;

    const newQuestion = new Question({ text, type, options });
    return await newQuestion.save();
};

exports.listQuestions = async () => {
    return await Question.find();
};

exports.updateQuestion = async (id, questionData) => {
    const errors = validationResult(questionData.req);
    const errorMessages = errors.array().map(err => err.msg).join(', ');
    if (!errors.isEmpty()) {
        throw new BadRequestError(errorMessages);
    }

    const { text, type, options } = questionData.body;

    let question = await Question.findById(id);
    if (!question) throw new NotFoundRequestError('Question not found');

    question.text = text || question.text;
    question.type = type || question.type;
    question.options = options || question.options;

    return await question.save();
};
