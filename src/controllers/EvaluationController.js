const EvaluationService = require('../services/EvaluationService');

exports.createEvaluation = async (req, res, next) => {
    const { period, type } = req.body;

    try {
        const evaluation = await EvaluationService.createEvaluation({ period, type });
        res.json(evaluation);
    } catch (err) {
        next(err);
    }
};

exports.listEvaluations = async (req, res, next) => {
    try {
        const evaluations = await EvaluationService.listEvaluations();
        res.json(evaluations);
    } catch (err) {
        next(err);
    }
};

exports.getEvaluationById = async (req, res, next) => {
    try {
        const evaluation = await EvaluationService.getEvaluationById(req.params.id);
        res.json(evaluation);
    } catch (err) {
        next(err);
    }
};

exports.updateEvaluation = async (req, res, next) => {
    const { period, type } = req.body;

    try {
        const evaluation = await EvaluationService.updateEvaluation(req.params.id, { period, type });
        res.json(evaluation);
    } catch (err) {
        next(err);
    }
};
