const EvaluationEmployee = require('../models/EvaluationEmployee');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

exports.getEvaluationEmployeeByIdEmp = async (req, res, next) => {
    try {
        const evaluationEmployee = await EvaluationEmployee.find ({employee : new ObjectId(req.params.id)})
            .populate('questions');

        if (!evaluationEmployee) throw new NotFoundRequestError('Evaluation of employee not found');
        res.json(evaluationEmployee);
    } catch (err) {
        next(err);
    }
}