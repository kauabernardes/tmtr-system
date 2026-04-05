import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Tables } from './types/tables.type';

@WebSocketGateway({ cors: { origin: '*' } })
export class TournamentGateway {
  @WebSocketServer()
  server: Server;

  emitTablesUpdate(
    allTables: Record<string, Record<string, Record<string, string>[]>>,
  ) {
    this.server.emit('tables', allTables);
  }
}
