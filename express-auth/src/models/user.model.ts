import { Schema, model, models } from 'mongoose';
import { IUser } from '@/interfaces/user.interface';

const UserSchema: Schema<IUser> = new Schema({
  userId: {
    type: String,
  },
  email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
  },
  fullName: {
      type: String,
      required: [true, "Full name is required"],
      minLength: [4, "Full name should be atleast 4 characters long"],
      maxLength: [30, "Full name should be less than 30 characters"]
  },
  password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password should be atlest 4 characters long"],
      maxlength: [30, "Password should be less than 30 characters"]
  },
  role: {
    type: String
  }
});

export const userModel = models.User || model("User", UserSchema);