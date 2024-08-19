import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Battle } from "./battles.entity";
import { Repository } from "typeorm";
import { PokemonsService } from "src/pokemons/pokemons.service";
import { battleRequest } from "./dtos/battle-request.dto";
import { PopulatedParticipants } from "./dtos/populated-participants.dto";
import { Pokemon } from "src/pokemons/pokemon.entity";

@Injectable()
export class BattlesService {
	constructor(
		@InjectRepository(Battle)
		private battlesRepository: Repository<Battle>,
		private readonly pokemonsService: PokemonsService
	) {}

	async getParticipants(
		participants: battleRequest
	): Promise<PopulatedParticipants> {
		const participant1 = await this.pokemonsService.findOne(
			participants.participant1Id
		);
		const participant2 = await this.pokemonsService.findOne(
			participants.participant2Id
		);
		return {
			participant1,
			participant2,
		};
	}

	battle(participant1: Pokemon, participant2: Pokemon): Pokemon {
		const participant1Damage =
			participant1.attack - participant2.defense > 1
				? participant1.attack - participant2.defense
				: 1;
		const participant2Damage =
			participant2.attack - participant1.defense > 1
				? participant2.attack - participant1.defense
				: 1;
		const participant1TurnsToWin = Math.ceil(
			participant2.hp / participant1Damage
		);
		const participant2TurnsToWin = Math.ceil(
			participant1.hp / participant2Damage
		);
		if (participant1TurnsToWin === participant2TurnsToWin) {
			return participant1.speed > participant2.speed
				? participant1
				: participant2;
		}
		if (participant1TurnsToWin < participant2TurnsToWin) {
			return participant1;
		}
		return participant2;
	}

	async saveBattle(
		participant1: Pokemon,
		participant2: Pokemon,
		winner: Pokemon
	): Promise<void> {
		const newBattle = this.battlesRepository.create({
			participant1,
			participant2,
			winner,
		});
		await this.battlesRepository.save(newBattle);
		return;
	}
}
