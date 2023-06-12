import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDTO } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) { }

    @Get(':page/:sort_by')
    async getTenMovies(@Param('page') page: number, @Param('sort_by') sort_by: string): Promise<MovieDTO[]> {
        const data = await this.moviesService.getMoviesFromAPI(page, sort_by);

        return data;
    }


}
