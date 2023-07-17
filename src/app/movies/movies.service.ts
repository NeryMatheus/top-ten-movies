import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MoviesService {
    private readonly NOW_PLAYING = process.env.NOW_PLAYING;
    private readonly POPULAR = process.env.POPULAR;
    private readonly TOKEN = process.env.TOKEN;
    private readonly NOWPLAYING = 'now_playing';
    private readonly POPULARMOVIES = 'popular';

    constructor(private readonly httpService: HttpService) { }
    
    async getTenMovies(page: number, api: string){
        const token = `Bearer ${this.TOKEN}`;
        this.httpService.axiosRef.defaults.headers.common['Authorization'] = token;

        try{     
            let url = '';  
            if(api === this.NOWPLAYING){
                url = `${this.NOW_PLAYING}?language=pt-BR&page=${page}`
            }else if(api === this.POPULARMOVIES){
                url = `${this.POPULAR}?page=${page}`
            }

            const response = await lastValueFrom(this.httpService.get(url));

            const dados = response.data.results.sort((a, b) => {
                if (a.popularity > b.popularity) {
                  return -1;
                }
                if (a.popularity < b.popularity) {
                  return 1;
                }
                return 0;
              });
          
              // Retorna apenas os 10 primeiros dados
              return dados.slice(0, 10);
        } catch (error) {            
            return error;
        }
    }

    async getMoviesFromAPI(page: number, api: string): Promise<MovieDTO[]>{

        let data = [];
        if(api === this.NOWPLAYING){
            data = await this.getTenMovies(page, this.NOWPLAYING);
        }else if (api === this.POPULARMOVIES){
            data = await this.getTenMovies(page, this.POPULARMOVIES);
        }
        
        const movieDto = new Array<MovieDTO>();

            data.forEach(element => {
                movieDto.push({                   
                    id: element.id,
                    title: element.title,
                    overview: element.overview,
                    release_date: element.release_date,
                    vote_average: element.vote_average,
                    popularity: element.popularity,
                    poster_path: element.poster_path,
                });                
            });            

        return movieDto;
    }
}
