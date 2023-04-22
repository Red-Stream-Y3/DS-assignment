import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      pattern : "^[a-zA-Z0-9_]*$",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSeller: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePic: {
      type: String,
      default: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    firstName: {
      type: String,
      pattern : "^[a-zA-Z]*$",
    },
    lastName: {
      type: String,
      pattern : "^[a-zA-Z]*$",
    },
    phone: {
      type: String,
      pattern : "^[0-9]*$",
    },
    shippingInfo : {
      number : {
        type: String,
        pattern : "^[a-zA-Z0-9/-]*$",
      },
      line1 : {
        type: String,
        pattern : "^[a-zA-Z]*$",
      },
      line2 : {
        type: String,
        pattern : "^[a-zA-Z]*$",
      },
      city : {
        type: String,
        pattern : "^[a-zA-Z]*$",
      },
      state : {
        type: String,
        pattern : "^[a-zA-Z]*$",
      },
      country : {
        type: String,
        pattern : "^[a-zA-Z]*$",
      },
      zip : {
        type: String,
        pattern : "^[0-9]*$",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
