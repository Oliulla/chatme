import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage } from './schema/chat.schema';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async sendMessage(senderId: string, receiverId: string, message: string) {
    const sender = await this.userModel.findById(senderId);
    const receiver = await this.userModel.findById(receiverId);

    if (!sender || !receiver) {
      throw new Error('Invalid sender or receiver');
    }

    if (sender.role === 'CM' && sender.supervisor?.toString() !== receiverId) {
      throw new Error('CM can only send messages to their supervisor');
    }

    if (
      sender.role === 'MS' &&
      !sender.subordinates.some(
        (subordinate) => subordinate.toString() === receiverId,
      )
    ) {
      throw new Error('MS can only send messages to their subordinates');
    }

    const chatMessage = new this.chatMessageModel({
      sender: senderId,
      receiver: receiverId,
      message,
    });

    return chatMessage.save();
  }

  async getMessagesBetweenUsers(userId1: string, userId2: string) {
    return this.chatMessageModel
      .find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 },
        ],
      })
      .sort({ timestamp: 1 })
      .exec();
  }
}
