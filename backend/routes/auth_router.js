import express from "express";
import passport from "passport";
import {
  checkUserInvalid,
  checkUserValid,
  logoutUser,
} from "../controllers/auth_controller.js";

const router = express.Router();

router.route("/login/success").get(checkUserValid);
router.route("/login/failed").get(checkUserInvalid);
router.route("/logout").get(logoutUser);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["read:user"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/destinations",
  }),
);

export default router;
