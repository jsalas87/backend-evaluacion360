const AnswerService = require('../services/AnswerService');

exports.createAnswer = async (req, res, next) => {
    const { question, response } = req.body;

    try {
        const answer = await AnswerService.createAnswer({ question, response });
        res.status(201).json(answer);
    } catch (err) {
        next(err);
    }
};

exports.getAnswerById = async (req, res, next) => {
    try {
        const answer = await AnswerService.getAnswerById(req.params.id);
        res.json(answer);
    } catch (err) {
        next(err);
    }
};

exports.updateAnswer = async (req, res, next) => {
    const { response } = req.body;

    try {
        const answer = await AnswerService.updateAnswer(req.params.id, { response });
        res.json(answer);
    } catch (err) {
        next(err);
    }
};
