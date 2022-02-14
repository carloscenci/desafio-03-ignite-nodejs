import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

 export class GamesRepository { //implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
      // Terminar
      return await this.repository.createQueryBuilder("games").where("games.title ilike :title", { title: `%${param}%`}).getMany()

  }

  async countAllGames():  Promise<[{ count: string }]> {
    return this.repository.query(
      `
        SELECT 
            COUNT(*)
        FROM 
          games;

      `
    ) 
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    
     const game = await this.repository.createQueryBuilder("games").leftJoinAndSelect("games.users", "user").select("").where("games.id = :id", {id}).getMany();

     console.log(game[0]?.users);
     
     return game[0]?.users;
  }

}
