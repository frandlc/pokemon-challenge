import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Res,
} from "@nestjs/common";
import { PokemonsService } from "./pokemons.service";
import { Pokemon } from "./pokemon.entity";
import { PokemonResponse } from "./dtos/pokemon-response.dto";

@Controller("pokemons")
export class PokemonsController {
	constructor(private readonly pokemonsService: PokemonsService) {}

	@Get()
	async getPokemons(): Promise<PokemonResponse[]> {
		try {
			const pokemonsDb: Pokemon[] = await this.pokemonsService.findAll();
			return pokemonsDb.map((item) => {
				return {
					id: item.id,
					name: item.name,
					attack: item.attack,
					defense: item.defense,
					hp: item.hp,
					speed: item.speed,
					type: item.type,
					imageUrl: item.imageUrl,
				};
			});
		} catch (error) {
			console.log(error);
			throw new HttpException(
				"Failed to fetch Pokémon data",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
