import express from "express";
import {
  createQA,
  deleteQA,
  getAllQAs,
  updateQA,
} from "../controllers/qas_controller.js";

const router = express.Router();

router.route("/").get(getAllQAs).post(createQA);
router.route("/:id").delete(deleteQA).put(updateQA);

export default router;
