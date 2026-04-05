import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ProcessDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsString() // Agora é IsString
    @IsOptional()
    tableName?: string; // Trocado de tableIndex para tableName
}