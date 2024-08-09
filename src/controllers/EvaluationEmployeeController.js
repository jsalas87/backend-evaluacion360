const { validationResult } = require('express-validator');
const EvaluationEmployee = require('../models/EvaluationEmployee');
const evaluationEmployeeService = require('../services/EvaluationEmployeeService');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');
const BadRequestError = require('../middlewares/BadRequestError');

exports.createEvaluationemployee = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        if (!errors.isEmpty()) {
            throw new BadRequestError(errorMessages);
        }

        const { employee, evaluation, questions } = req.body;
        const newEvaluationemployee = new EvaluationEmployee({ employee, evaluation, questions });
        newEvaluationemployee.state = 'pending'
        const evaluationEmployee = await newEvaluationemployee.save();
        res.json(evaluationEmployee);
    } catch (err) {
        next(err)
    }

}

exports.completeEvaluationEmployee = async (req, res, next) => {

    try {
        let evaluationEmployee = await EvaluationEmployee.findById(req.params.id);
        if (!evaluationEmployee) throw new NotFoundRequestError('Evaluation of employee not found');

        evaluationEmployee.state = 'completed';
        await evaluationEmployee.save();
        res.json({ msg: 'Evaluation of employee submitted successfully' });
    } catch (err) {
        next(err)
    }

}

exports.getEvaluationemployeeById = async (req, res, next) => {
    try {
        const evaluationEmployee = await EvaluationEmployee.findById(req.params.id)
            .populate('questions');

        if (!evaluationEmployee) throw new NotFoundRequestError('Evaluation of employee not found');
        res.json(evaluationEmployee);
    } catch (err) {
        next(err)
    }
}

exports.respondEvaluationEmployee = async (req, res, next) => {
    const responses = req.body;

    if (!Array.isArray(responses) || responses.length === 0) {
        throw new BadRequestError('Array of answer is required');
    }

    try {
        const evaluationEmployee = await evaluationEmployeeService.evaluateEmployee(req.params.id, responses);
        res.json({ msg: 'Evaluation of employee submitted successfully', evaluationEmployee });
    } catch (err) {
        next(err)
    }
};
