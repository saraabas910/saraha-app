import * as authService from '../service/auth.service.js';
import { validate } from '../../../common/validation/validation.js';


export async function register(req, res , next) {
  try{
    const validatedData = validate(registerSchema, req.body);
    const createdUser = await authService.register(validatedData)
    res.status(201).json({ message: 'User registered successfully', 
       data: createdUser });
  }
    catch(error){
    next(error);
  }
}

export async function verifyAccount(req, res , next) {
  try{
    const validatedData = validate(verifyAccountSchema, req.body);
    const { code, email } = validatedData;
    const updatedUser = await authService.verifyAccount(code, email);
    res.status(200).json({ message: 'Account verified successfully', 
       data: updatedUser });
  }
    catch(error){
    next(error);
  } 
}

export async function login(req, res , next) {
  try{
    const validatedData = validate(loginSchema, req.body);
    const { email, password } = validatedData;
    const token = await authService.login(email, password);
    res.cookie('token', token, { httpOnly: true, secure: true , maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: 'Login successful', 
       token: token });
  }
    catch(error){
    next(error);
  } 

}

export async function resendOTP(req, res , next) {
  try{
    const validatedData = validate(sendOTPSchema, req.body);
    const { email } = validatedData;
    await authService.resendOTP(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  }
    catch(error){
    next(error);
  }
}
 export async function changePassword(req, res , next) {
  try{
    const validatedData = validate(changePasswordSchema, req.body);
    const { email, newPassword, code } = validatedData;
    await authService.changePassword(email, newPassword, code);
    res.status(200).json({ message: 'Password changed successfully' });
  }
    catch(error){
    next(error);
  }
}

 async function googleLogin(req, res , next) {
  try{
    
    const token = await authService.googleLogin(req.body.idToken);
    res.cookie('token', token, { httpOnly: true , maxAge: 24 * 60 * 60 * 1000 });
    res.json({ message: 'Login successful', 
       token: token });
  }
    catch(error){
    next(error);
  } 

}