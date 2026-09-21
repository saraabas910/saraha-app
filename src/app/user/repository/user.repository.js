import {User} from "../models/user.model.js";

export async function verifyAccount(email, updateData) {
  const user = await User.findOneAndUpdate(
    { email: email },
    updateData,
    { returnDocument: 'after' }
  );

}
