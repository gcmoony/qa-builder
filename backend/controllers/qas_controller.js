import { StatusCodes } from "http-status-codes";
import { QuestionAnswer } from "../models/qas_model.js";

export const createQA = async (req, res) => {
  try {
    await QuestionAnswer.create({ question: req.body.question });

    return res.status(StatusCodes.CREATED).json({ msg: "QA created!" });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Failed to create new QA!",
    });
  }
};

export const getAllQAs = async (req, res) => {
  try {
    const qas = await QuestionAnswer.find();
    return res.status(StatusCodes.OK).json({
      questions_answers: qas,
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error });
  }
};

export const getQA = async (req, res) => {
  try {
    const qa = await QuestionAnswer.findOne({ _id: req.params.id });
    return res.status(StatusCodes.OK).json(qa);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error });
  }
};

export const deleteQA = async (req, res) => {
  try {
    const result = await QuestionAnswer.findOneAndDelete({
      _id: req.params.id,
    });
    if (result) {
      return res.status(StatusCodes.ACCEPTED).json({
        message: `Deleted ${req.params.id}`,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Not found",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error });
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
    if (!qa) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
    }
    return res.status(StatusCodes.ACCEPTED).json({
      message: `Updated ${req.params.id}`,
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: error });
  }
};
