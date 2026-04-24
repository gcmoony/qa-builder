import mongoose from "mongoose";

const qaSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: (props) => `Some random validation error happened here`,
    },
  },
  answer: {
    type: String,
    default: "",
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ghUser",
  },
});

export const QuestionAnswer = mongoose.model("QAs", qaSchema);
