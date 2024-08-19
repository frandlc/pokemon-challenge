import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pokemon } from "./pokemon.entity";

@Injectable()
export class PokemonsService {
	constructor(
		@InjectRepository(Pokemon)
		private pokemonsRepository: Repository<Pokemon>
	) {}

	async findAll(): Promise<Pokemon[]> {
		return await this.pokemonsRepository.find();
	}

	async findOne(pokemonId: string): Promise<Pokemon> {
		return await this.pokemonsRepository.findOneByOrFail({ id: pokemonId });
	}
}
