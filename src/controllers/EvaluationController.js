const Evaluation = require('../models/Evaluation');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

// Crear nueva evaluación
exports.createEvaluation = async (req, res, next) => {
  const { period, type } = req.body;

  try {
    const newEvaluation = new Evaluation({ period, type });
    const evaluation = await newEvaluation.save();
    res.json(evaluation);
  } catch (err) {
    next(err)
  }
};

// Listar evaluaciones
exports.listEvaluations = async (req, res, next) => {
  try {
    const evaluations = await Evaluation.find();
    res.json(evaluations);
  } catch (err) {
    next(err)
  }
};

// Obtener detalles de una evaluación por ID
exports.getEvaluationById = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) throw new NotFoundRequestError('Evaluation not found');
    res.json(evaluation);
  } catch (err) {
    next(err)
  }
};

// Actualizar evaluación por ID
exports.updateEvaluation = async (req, res, next) => {
  const { period, type } = req.body;

  try {
    let evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) throw new NotFoundRequestError('Evaluation not found');

    evaluation.period = period || evaluation.period;
    evaluation.type = type || evaluation.type;

    await evaluation.save();
    res.json(evaluation);
  } catch (err) {
    next(err)
  }
};
