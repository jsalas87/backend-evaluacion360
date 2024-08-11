const QuestionService = require('../services/QuestionService');

exports.createQuestion = async (req, res, next) => {
    try {
        const question = await QuestionService.createQuestion({ req, body: req.body });
        res.json(question);
    } catch (err) {
        next(err);
    }
};

exports.listQuestions = async (req, res, next) => {
    console.log('listQuestions ejecutado, obteniendo preguntas...');
    try {
        const questions = await QuestionService.listQuestions();
        res.json(questions);
    } catch (err) {
        next(err);
    }
};

exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await QuestionService.updateQuestion(req.params.id, { req, body: req.body });
        res.json(question);
    } catch (err) {
        next(err);
    }
};
