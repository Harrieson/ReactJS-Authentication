import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    profilePicture: {
      type: String,
      default: 'https://png.pngtree.com/png-clipart/20210915/ourmid/pngtree-user-avatar-login-interface-abstract-blue-icon-png-image_3917504.jpg'
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
