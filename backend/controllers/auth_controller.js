import { StatusCodes } from "http-status-codes";
import passport from "passport";

export const checkUserValid = (req, res) => {
  if (req.user) {
    res.status(StatusCodes.OK).json({ user: req.user });
  }
  res.json({ user: null, statusCode: StatusCodes.FORBIDDEN });
};

export const checkUserInvalid = (req, res) => {
  res.status(StatusCodes.UNAUTHORIZED).json({
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
      res.status(StatusCodes.OK).json({ message: "Logout", user: {} });
    });
  });
};
