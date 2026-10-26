import {User} from "../model/user.model.js";



export async function verifyAccount(email, updateData) {
  const user = await User.findOneAndUpdate(
    { email: email },
    updateData,
    { returnDocument: 'after' }
  );

}

export async function findUserByid(id) {
  return await User.findById(id);
}


export async function updateUserByEmail(email, updateData) {
  const user = await User.findOneAndUpdate(
    { email: email },
    updateData,
    { returnDocument: 'after' }
  );
  return user;
}