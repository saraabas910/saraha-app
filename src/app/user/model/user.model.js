import { Schema, model } from "mongoose";


const userSchema = new Schema({

  name: {
     type: String,
     required: true,
     minlength: 3,
     maxlength: 30,
     trim: true

  },
  email: {
     type: String,
     required: true,
     unique: true,
     trim: true,
     lowercase: true
  },
  password: {
        type: String,
        required: function() {
            return this.provider=== 'local';
        },

   
  },

  provider: {
    type: String,
    enum: ['local', 'google', 'facebook'], 
    default: 'local'},

    isdeleted: {
        type: Boolean,
        default: false
    },

        isverified: {
        type: Boolean,
        default: false
    },

    dob : date,

    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    
},

     

        
},{

    timestamps: {
        createdAt: true,
        updatedAt: true
      
         } 
}
);
export const User = model('User', userSchema);


