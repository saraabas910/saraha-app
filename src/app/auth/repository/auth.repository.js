import User from '../models/user.model.js';

export async function findUserByEmail(email) {

     return await User.findOne({ email: email });
}

export async function createUser(userData) {
     return await User.create(userData);
}