import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    // console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: {
      senderId: string;
      receiverId: string;
      message: string;
    },
  ) {
    try {
      const chatMessage = await this.chatService.sendMessage(
        data.senderId,
        data.receiverId,
        data.message,
      );
      this.server.emit('message', chatMessage);
    } catch (error) {
      console.error('Error handling message:', error.message);
    }
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { username: string }): void {
    this.server.emit('typing', data);
  }

  @SubscribeMessage('stopTyping')
  handleStopTyping(@MessageBody() data: { username: string }): void {
    this.server.emit('stopTyping', data);
  }
}
