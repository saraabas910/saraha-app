import * as authService from '../service/auth.service.js';


export async function register(req, res , next) {
  try{
    const createdUser = await authService.register(req.body)
    res.status(201).json({ message: 'User registered successfully', 
       data: createdUser });
  }
    catch(error){
    next(error);
  }
}

export async function verifyAccount(req, res , next) {
  try{
    const { code, email } = req.body;
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
    const { email, password } = req.body;
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
    const { email } = req.body;
    await authService.resendOTP(email);
    res.status(200).json({ message: 'OTP sent successfully' });
  }
    catch(error){
    next(error);
  }
}
