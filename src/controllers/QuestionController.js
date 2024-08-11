const Question = require('../models/Question');
const NotFoundRequestError = require('../middlewares/NotFoundRequestError');

// Crear nueva pregunta
exports.createQuestion = async (req, res, next) => {
  const { text, type, options } = req.body;

  try {
    const newQuestion = new Question({ text, type, options });
    const question = await newQuestion.save();
    res.json(question);
  } catch (err) {
    next(err)
  }
};

// Listar preguntas
exports.listQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    next(err)
  }
};

// Actualizar pregunta por ID
exports.updateQuestion = async (req, res, next) => {
  const { text, type, options } = req.body;

  try {
    let question = await Question.findById(req.params.id);
    if (!question) throw new NotFoundRequestError('question employee not found');

    question.text = text || question.text;
    question.type = type || question.type;
    question.options = options || question.options;

    await question.save();
    res.json(question);
  } catch (err) {
    next(err)
  }
};
