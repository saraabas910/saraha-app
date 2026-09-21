import {Schema, model} from 'mongoose';

const otpSchema = new Schema({
  email: {
    type: String,
    required: true
  },
 
  code : {
    type: String,
    required: true,
    length: 6
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } 
}

},
{
    timestamps : {
        createdAt: true,
        updatedAt: false
    }
}
);

export const OTP = model('OTP', otpSchema);