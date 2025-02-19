import mongoose from "mongoose";
const { Schema } = mongoose;

const model = new Schema({
  username: { type: String, required: true },
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hint: { type: String },
});

export default mongoose.model("users", model);
