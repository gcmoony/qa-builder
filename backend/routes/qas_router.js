import express from "express";
import {
  createQA,
  deleteQA,
  getAllQAs,
  getQA,
  updateQA,
} from "../controllers/qas_controller.js";

const router = express.Router();

router.route("/").get(getAllQAs).post(createQA);
router.route("/:id").delete(deleteQA).put(updateQA).get(getQA);

export default router;
