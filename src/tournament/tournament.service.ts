import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { TournamentGateway } from './tournament.gateway';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

@Injectable()
export class TournamentService implements OnModuleInit {
  private readonly filePath = join(process.cwd(), 'tournament-data.json');

  constructor(private readonly tournamentGateway: TournamentGateway) {}

  private tablesMemory: Map<string, Record<string, Record<string, string>[]>> =
    new Map();

  onModuleInit() {
    this.initialLoad();
  }

  private initialLoad() {
    try {
      if (existsSync(this.filePath)) {
        const raw = readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);

        this.tablesMemory = new Map(Object.entries(parsed));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do torneio:', error);
      this.tablesMemory = new Map();
    }
  }

  private saveToFile() {
    try {
      const data = Object.fromEntries(this.tablesMemory);
      writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erro ao guardar dados no disco:', error);
    }
  }

  process(
    text: string,
    category: string = 'default',
    tableName: string = 'Principal',
  ) {
    const categoryTables = this.tablesMemory.get(category) || {};

    if (!text || text.trim() === '') {
      categoryTables[tableName] = [];
      this.tablesMemory.set(category, categoryTables);
      this.tournamentGateway.emitTablesUpdate(
        Object.fromEntries(this.tablesMemory),
      );
      return categoryTables[tableName];
    }

    const linhas = text.trim().split('\n');
    const headers = linhas[0].split('\t').map((h) => h.trim());

    const tabelaFormatada = linhas
      .slice(1)
      .filter((linha) => linha.trim() !== '')
      .map((linha) => {
        const valores = linha.split('\t').map((v) => v.trim());
        const obj: Record<string, string> = {};

        headers.forEach((header, index) => {
          const key = header || `Coluna_${index}`;
          obj[key] = valores[index] || '';
        });

        return obj;
      });

    categoryTables[tableName] = tabelaFormatada;

    this.tablesMemory.set(category, categoryTables);
    this.saveToFile();
    this.tournamentGateway.emitTablesUpdate(
      Object.fromEntries(this.tablesMemory),
    );

    return this.tablesMemory.get(category)?.[tableName] || [];
  }

  delete(category: string, tableName?: string) {
    if (!this.tablesMemory.has(category)) {
      throw new NotFoundException(`Seção '${category}' não encontrada`);
    }

    if (!tableName) {
      this.tablesMemory.delete(category);
    } else {
      const categoryTables = this.tablesMemory.get(category);

      if (categoryTables && categoryTables[tableName]) {
        if (!categoryTables[tableName]) {
          throw new NotFoundException(
            `Tabela '${tableName}' não encontrada na seção '${category}'`,
          );
        }

        delete categoryTables[tableName];

        if (Object.keys(categoryTables).length === 0) {
          this.tablesMemory.delete(category);
        }
      }
    }

    this.saveToFile();
    this.tournamentGateway.emitTablesUpdate(
      Object.fromEntries(this.tablesMemory),
    );

    return { success: true, message: 'Tabela ou sessão removida com sucesso' };
  }

  getTables() {
    return Object.fromEntries(this.tablesMemory);
  }
}
