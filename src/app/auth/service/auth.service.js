import * as userRepository from '../repository/user.repository.js';
import * as otpRepository from '../repository/otp.repository.js';
import { sendEmail } from '../../../common/email/nodemailer.js';
import bcrypt from 'bcrypt'; 
import crypto from 'crypto';   
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

export async function register(userData) {

    const user = await userRepository.findUserByEmail(userData.email);
    if(user){
        throw new Error('User already exists');
    }

    userData.password = await bcrypt.hash(userData.password, 10);

     const createdUser = await userRepository.createUser(userData);
     const otp = crypto.randomInt(100000, 999999).toString();
        await otpRepository.createOTP({  code: otp,
             email:userData.email , 
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    
        });
        await sendEmail(userData.email, 'Verify your email', `<p>Your OTP is: ${otp}</p>`);
        return createdUser;

}

export async function verifyAccount(code, email) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.isVerified) {
    throw new Error('User is already verified');
  }
  const otp= await otpRepository.findOTPByEmail(email)
  if (!otp) {
    throw new Error('OTP expired, please request a new one');
  }
  if (otp.code !== code) {
    throw new Error('Invalid OTP');
  }
   const updatedUser = await userRepository.verifyAccount(email, { isVerified: true });

    await otpRepository.deleteOTP(email);

    return updatedUser;

}

export async function login(email, password) {
   const user = await userRepository.findUserByEmail(email);
   if (!user) {
     throw new Error('Invalid email or password');
   }
   if (!user.isVerified) {
     throw new Error('Account not verified.Please verify your account before logging in.');
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     throw new Error('Invalid email or password');
   }
   const Token = jwt.sign({expiresIn: '1h'}, process.env.JWT_SECRET, {id: user._id, email: user.email, name: user.name})
   
       
   return Token;
}

export async function resendOTP(email) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
    await otpRepository.deleteOTP(email);
    const code = crypto.randomInt(100000, 999999).toString();
    await otpRepository.createOTP({  code: code,
         email: email, 
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });
    await sendEmail(email, 'Change Password', `<p>Your OTP is: ${code}</p>`);
 
}

 export async function changePassword(email, newPassword,code) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }
  const otpRecord = await otpRepository.findOTPByEmail(email);
  if (!otpRecord) {
    throw new Error('OTP expired, please request a new one');
  }
  if (otpRecord.code !== code) {
    throw new Error('Invalid OTP');
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await userRepository.updateUser(email, { password: hashedPassword });
  await otpRepository.deleteOTP(email);
  return updatedUser;
}
 









 export async function LoginWithGoogle(idToken) {
  const payload = await verifyToken(idToken);
  const email = payload.email;
  const user = await userRepository.findUserByEmail(email);
   if (user) {
    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
   }

    const newUser= await userRepository.createUser({ email: payload.email, name: payload.name, isVerified: true ,provider: 'google' });
    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;

  }