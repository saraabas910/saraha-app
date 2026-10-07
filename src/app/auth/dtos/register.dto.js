import {z} from "zod";

export const registerSchema = z.object({
 email : z.email().lowercase().trim(),
    password : z.string().min(6).max(20).trim(),
    name : z.string().min(2).max(50).trim(),
    dob: z.date().optional(),
    gender: z.enum(['male', 'female']).optional(),

});
 export const verifyAccountSchema = z.object({
  code: z.string().length(6).trim(),
  email: z.email().lowercase().trim(),
});


export const loginSchema = z.object({
  email: z.email().lowercase().trim(),
  password: z.string().min(6).max(20).trim(),
});

export const sendOTPSchema = z.object({
  email: z.email().lowercase().trim(),
});

export const changePasswordSchema = z.object({
  email: z.email().lowercase().trim(),
  newPassword: z.string().min(6).max(20).trim(),
  code: z.string().length(6).trim(),
});