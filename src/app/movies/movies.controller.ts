import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDTO } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {

    private readonly NOWPLAYING = 'now_playing';
    private readonly POPULARMOVIES = 'popular';

    constructor(private readonly moviesService: MoviesService) { }

    @Get('now-playing/:page')
    async getNowPlaying(@Param('page') page: number): Promise<MovieDTO[]> {
        const data = await this.moviesService.getMoviesFromAPI(page, this.NOWPLAYING);

        return data;
    }

    @Get('popular/:page')
    async getPoupular(@Param('page') page: number): Promise<MovieDTO[]> {
        const data = await this.moviesService.getMoviesFromAPI(page, this.POPULARMOVIES);

        return data;
    }
}
