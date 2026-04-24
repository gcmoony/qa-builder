import { StatusCodes } from "http-status-codes";
import passport from "passport";

export const checkUserValid = (req, res) => {
  if (req.user) {
    res.json({ user: req.user, statusCode: StatusCodes.OK });
  }
  res.json({ user: null, statusCode: StatusCodes.FORBIDDEN });
};

export const checkUserInvalid = (req, res) => {
  res.json({
    statusCode: StatusCodes.UNAUTHORIZED,
    message: "failed to authorized",
  });
};

export const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      res.json({ statusCode: StatusCodes.OK, message: "Logout", user: {} });
    });
  });
};
