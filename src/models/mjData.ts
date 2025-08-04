import mongoose, { Schema, Document } from "mongoose";

export interface IMJData extends Document {
  prompt: string;
  imageUrl: string;
  messageId: string;
  channelId: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mjDataSchema = new Schema<IMJData>(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    messageId: {
      type: String,
      required: true,
      unique: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MJData = mongoose.model<IMJData>("MJData", mjDataSchema);
