import { Router } from "express";
import argon2 from "argon2";
import userModel from "../models/userModel.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  const { body } = req;
  const { username, password } = body;
  try {
    if (!username || !password) {
      return res.status(400).send("send me the auth data dingaling");
    }
    // const hash = await argon2.hash(password);
    const hash = await argon2.hash(password);
    console.log(password);
    console.log(hash);

    const userData = {
      userid: username.toLowerCase(),
      username,
      password: hash,
    };

    const toSave = new userModel(userData);
    toSave.save();
    return res.status(200).send("OK");
  } catch (e) {
    return res.status(500).json(e);
  }
});

export default router;
