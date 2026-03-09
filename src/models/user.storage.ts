import mongoose, { model, Schema } from "mongoose";

interface IUserStorage {
  ownerId: string;
  businessName: string;
  supportEmail: string;
  knowledge: string;
}

const userStorageSchema = new Schema<IUserStorage>(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true
    },
    businessName: {
      type: String,
      required: true,
    },
    supportEmail: {
      type: String,
      required: true,
    },
    knowledge: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userStorage = mongoose.models.Setting || model("Setting", userStorageSchema);

export default userStorage;