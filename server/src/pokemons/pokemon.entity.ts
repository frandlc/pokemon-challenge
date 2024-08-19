import { Battle } from "../battles/battles.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Pokemon {
	@PrimaryColumn("varchar")
	id: string;

	@Column({
		type: "varchar",
		length: 50,
		unique: true,
	})
	name: string;

	@Column("integer")
	attack: number;

	@Column("integer")
	defense: number;

	@Column("integer")
	hp: number;

	@Column("integer")
	speed: number;

	@Column("integer")
	type: string;

	@Column()
	imageUrl: string;

	@OneToMany(() => Battle, (battle) => battle.participant1)
	battlesAsParticipant1: Battle[];

	@OneToMany(() => Battle, (battle) => battle.participant2)
	battlesAsParticipant2: Battle[];

	@OneToMany(() => Battle, (battle) => battle.winner)
	battlesAsWinner: Battle[];
}
