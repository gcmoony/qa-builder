import GitHubPassport from "passport-github2";
import { User } from "../models/user_model.js";

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

const verify = async (accessToken, refreshToken, profile, callback) => {
  const {
    _json: { id, name, login, avatar_url },
  } = profile;
  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken,
  };

  try {
    let user = await User.findOne({ username: userData.username });
    if (!user) {
      user = await User.create(userData);
    }
    return callback(null, user);
  } catch (error) {
    return callback(error);
  }
};

export const Github = new GitHubPassport.Strategy(options, verify);
