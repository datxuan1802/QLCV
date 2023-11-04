import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'workspaces-socket',
  cors: true,
})
export class WorkspacesGateway {
  private logger: Logger = new Logger('WorkspacesGateway');

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const { workspace_id } = client.handshake.query;
    client.join(workspace_id);
    this.logger.log('Connect to workspace socket server success');
  }

  handleDisconnect(client: any) {
    // Handle disconnection event
    this.logger.log('DisConnect to workspace socket server success');
  }
  // Function to emit events
  sendEventToClients(data: any) {
    return this.server.emit('user-access', data);
  }
}
