import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { ProcessDto } from './dto/process.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('process')
  async process(@Body() processDto: ProcessDto) {
    return await this.tournamentService.process(
      processDto.text,
      processDto.category,
      processDto.tableName,
    );
  }

  @Delete(['tables/:category', 'tables/:category/:tableName'])
  async delete(
    @Param('category') category: string,
    @Param('tableName') tableName?: string,
  ) {
    return await this.tournamentService.delete(category, tableName);
  }

  @Get('tables')
  getCurrent() {
    return this.tournamentService.getTables();
  }
}
