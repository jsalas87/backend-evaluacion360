const { Answer } = require('../models/Answer');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.createAnswer = async ({ question, response }) => {
    const newAnswer = new Answer({ question, response });
    return await newAnswer.save();
};

exports.getAnswerById = async (id) => {
    const answer = await Answer.findById(id).populate('question');
    if (!answer) throw new NotFoundRequestError('Answer not found');
    return answer;
};

exports.updateAnswer = async (id, { response }) => {
    let answer = await Answer.findById(id);
    if (!answer) throw new NotFoundRequestError('Answer not found');

    answer.response = response || answer.response;
    return await answer.save();
};
