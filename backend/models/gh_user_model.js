import mongoose from "mongoose";

const ghUserSchema = new mongoose.Schema({
  githubid: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  accesstoken: { type: String, required: true },
  avatarurl: { type: String },
});

export const GithubUser = mongoose.model("ghUser", ghUserSchema);
