import { Body, Controller, Post } from "@nestjs/common";
import { BattlesService } from "./battles.service";
import { battleRequest } from "./dtos/battle-request.dto";
import { PopulatedParticipants } from "./dtos/populated-participants.dto";
import { PokemonResponse } from "src/pokemons/dtos/pokemon-response.dto";

@Controller("battle")
export class BattlesController {
	constructor(private readonly battlesService: BattlesService) {}

	@Post()
	async battleAndSave(@Body() participants: battleRequest) {
		const PopulatedParticipants: PopulatedParticipants =
			await this.battlesService.getParticipants(participants);
		const battleWinner = this.battlesService.battle(
			PopulatedParticipants.participant1,
			PopulatedParticipants.participant2
		);
		await this.battlesService.saveBattle(
			PopulatedParticipants.participant1,
			PopulatedParticipants.participant2,
			battleWinner
		);
		const battleResponse: PokemonResponse = {
			id: battleWinner.id,
			name: battleWinner.name,
			attack: battleWinner.attack,
			defense: battleWinner.defense,
			hp: battleWinner.hp,
			speed: battleWinner.speed,
			type: battleWinner.type,
			imageUrl: battleWinner.imageUrl,
		};
		return battleResponse;
	}
}
