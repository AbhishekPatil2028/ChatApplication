
import User from "../models/ChatUser.model.js";


export const getAllUsers = async (req, res) => {
  const users = await User.find().select("name email isOnline");
  res.json(users);
};