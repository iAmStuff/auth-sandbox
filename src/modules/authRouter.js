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
    if (
      await userModel.findOne({
        userid: username.toLowerCase(),
      })
    ) {
      return res.status(400).send("Username already exists!");
    }

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

router.post("/login", async (req, res, next) => {
  const { body } = req;
  const { username, password } = body;
  try {
    if (!username || !password) {
      return res.status(400).send("send me the auth data dingaling");
    }

    const userData = await userModel.findOne({
      userid: username.toLowerCase(),
    });

    if (!userData) {
      return res.status(400).send("Invalid username/password");
    }

    const validPass = await argon2.verify(userData.password, password);
    if (validPass) {
      return res.send("Login succseseful");
    }
    return res.status(400).send("Invalid username/password");
  } catch (e) {
    return res.status(500).json(e);
  }
});
export default router;
