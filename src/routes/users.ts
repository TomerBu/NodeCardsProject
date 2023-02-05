import { Router } from "express";
import _ from "underscore";
import Joi from "joi";
import { passwordRegex } from "../validators/utils.js";
import { User } from "../db/models/user.js";
import { validateSignUp } from "../middleware/verifySignupBody.js";
 

const router = Router();

//api/auth/signup
router.post("/signup", validateSignUp, async (req, res) => {
  
  try {
 
    const body = _.pick(req.body, "username", "email", "password");

    const user = await new User(body).save();
    return res.json({ message: "user saved", id: user._id });
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

export { router as authRouter };
