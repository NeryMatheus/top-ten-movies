import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { MovieDTO } from './dto/movie.dto';

@Injectable()
export class MoviesService {
    private readonly API_URL = process.env.URL;
    private readonly INCLUDE_ADULT = process.env.INCLUDE_ADULT;
    private readonly INCLUDE_VIDEO = process.env.INCLUDE_VIDEO;
    private readonly TOKEN = process.env.TOKEN;

    constructor(private readonly httpService: HttpService) { }
    
    async getTenMovies(page: number, sort_by: string){
        const token = `Bearer ${this.TOKEN}`;
        this.httpService.axiosRef.defaults.headers.common['Authorization'] = token;

        try{        
            const url = `${this.API_URL}?include_adult=${this.INCLUDE_ADULT}&include_video=${this.INCLUDE_VIDEO}&language=pt-BR&page=${page}&sort_by=${sort_by}`;
            
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

    async getMoviesFromAPI(page: number, sort_by: string): Promise<MovieDTO[]>{

        const data = await this.getTenMovies(page, sort_by);
        const movieDto = new Array<MovieDTO>();

            data.forEach(element => {
                movieDto.push({                   
                    id: element.id,
                    title: element.title,
                    overview: element.overview,
                    release_date: element.release_date,
                    vote_average: element.vote_average,
                    popularity: element.popularity
                });                
            });            

        return movieDto;
    }

}
