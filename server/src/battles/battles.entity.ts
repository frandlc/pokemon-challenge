import { Pokemon } from "../pokemons/pokemon.entity";
import {
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Battle {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsParticipant1)
	participant1: Pokemon;

	@ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsParticipant2)
	participant2: Pokemon;

	@ManyToOne(() => Pokemon, (pokemon) => pokemon.battlesAsWinner)
	winner: Pokemon;

	@CreateDateColumn()
	createdAt: String;
}
