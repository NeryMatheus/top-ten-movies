import { IsNumber, IsString } from "class-validator";

export class MovieDTO {
    id: number;
    
    @IsString( {message: 'O título deve ser uma string'} )
    title: string;

    @IsString( {message: 'O título deve ser uma string'} )
    overview: string;

    @IsString( {message: 'O título deve ser uma string'} )
    release_date: string;

    @IsNumber()
    vote_average: number;

    @IsNumber()
    popularity: number;
}