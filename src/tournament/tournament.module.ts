import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentGateway } from './tournament.gateway';

@Module({
    providers: [TournamentService, TournamentGateway],
    exports: [TournamentService],
    controllers: [TournamentController]
})
export class TournamentModule {}
