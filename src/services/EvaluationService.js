// services/EvaluationService.js
const Evaluation = require('../models/Evaluation');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.createEvaluation = async ({ period, type }) => {
    const newEvaluation = new Evaluation({ period, type });
    return await newEvaluation.save();
};

exports.listEvaluations = async () => {
    return await Evaluation.find();
};

exports.getEvaluationById = async (id) => {
    const evaluation = await Evaluation.findById(id);
    if (!evaluation) throw new NotFoundRequestError('Evaluation not found');
    return evaluation;
};

exports.updateEvaluation = async (id, { period, type }) => {
    let evaluation = await Evaluation.findById(id);
    if (!evaluation) throw new NotFoundRequestError('Evaluation not found');

    evaluation.period = period || evaluation.period;
    evaluation.type = type || evaluation.type;

    return await evaluation.save();
};
