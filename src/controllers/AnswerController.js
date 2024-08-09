const Answer = require('../models/Answer');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.createAnswer = async (req, res, next) => {
    const { question, response } = req.body;

    try {
        const newAnswer = new Answer({ question, response });
        const answer = await newAnswer.save();
        res.json(answer);
    } catch (err) {
        next(err)
    }
};

exports.getAnswerById = async (req, res, next) => {
    try {
        const answer = await Answer.findById(req.params.id)
            .populate('question');
        if (!answer) throw new NotFoundRequestError('Answer not found');
        res.json(answer);
    } catch (err) {
        next(err)
    }
};

exports.updateAnswer = async (req, res, next) => {
    const { response } = req.body;

    try {
        let answer = await Answer.findById(req.params.id);
        if (!answer) throw new NotFoundRequestError('Answer not found');

        answer.response = response || answer.response;
        await answer.save();
        res.json(answer);
    } catch (err) {
        next(err)
    }
};
