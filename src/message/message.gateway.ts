import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { getObjectId } from 'src/utils/helper';

// @Public()
@WebSocketGateway({
  cors: true,
})
export class MessageGateway implements OnGatewayConnection {
  constructor(private readonly messageService: MessageService) {}
  private logger: Logger = new Logger('MessageGateway');
  @WebSocketServer()
  server: Server;

  // constructor(private userSer) {}

  async handleConnection(client: Socket) {
    const { task_id, user_id } = client.handshake.query;
    client.join(task_id);
    this.logger.log('Connect to socket server success');
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
    this.logger.log('DisConnect to socket server success');
  }

  @SubscribeMessage('send-comment')
  async handleEvent(
    @MessageBody()
    data: {
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    const { task_id, user_id } = client.handshake.query;

    const createMessageDto: CreateMessageDto = {
      task: getObjectId(task_id as string),
      user: getObjectId(user_id as string),
      message: data.message,
    };

    const createComment = await this.messageService.create(createMessageDto);
    const returnData = await createComment.populate('user', '_id name avatar');
    this.server.to(task_id).emit('receive-comment', returnData);
    return createComment;
  }
}
