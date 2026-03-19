import express from "express";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
    );

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;