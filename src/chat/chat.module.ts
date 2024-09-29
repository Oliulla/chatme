import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schema/chat.schema';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AuthModule } from 'src/auth/auth.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  exports: [MongooseModule, ChatService],
})
export class ChatModule {}
