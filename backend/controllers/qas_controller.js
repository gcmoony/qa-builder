import { StatusCodes } from "http-status-codes";
import { QuestionAnswer } from "../models/qas_model.js";

export const createQA = async (req, res) => {
  try {
    await QuestionAnswer.create({ question: req.body.question });

    return res.json({ msg: "QA created!", statusCode: StatusCodes.CREATED });
  } catch (error) {
    return res.json({
      message: "Failed to create new QA!",
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }
};

export const getAllQAs = async (req, res) => {
  try {
    const qas = await QuestionAnswer.find();
    return res.json({
      questions_answers: qas,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    return res.json({ message: error, statusCode: StatusCodes.UNAUTHORIZED });
  }
};

export const deleteQA = async (req, res) => {
  try {
    const result = await QuestionAnswer.findOneAndDelete({
      _id: req.params.id,
    });
    if (result) {
      return res.json({
        message: `Deleted ${req.params.id}`,
        statusCode: StatusCodes.ACCEPTED,
      });
    } else {
      return res.json({
        message: "Not found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
  } catch (error) {
    return res.json({ message: error, statusCode: StatusCodes.UNAUTHORIZED });
  }
};

export const updateQA = async (req, res) => {
  const options = { runValidators: true };
  try {
    const qa = await QuestionAnswer.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      options,
    );
    return res.json({
      message: `Updated ${req.params.id}`,
      statusCode: StatusCodes.ACCEPTED,
    });
  } catch (error) {
    return res.json({ message: error, statusCode: StatusCodes.UNAUTHORIZED });
  }
};
