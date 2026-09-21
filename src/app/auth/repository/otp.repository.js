import {OTP} from "../models/otp.model.js";

export async function createOTP(otpData) {
    return await OTP.create(otpData);
}

export async function findOTPByEmail(email) {
    return await OTP.findOne({ email: email });
}

export async function deleteOTP(email) {
    return await OTP.deleteMany({ email: email });
}