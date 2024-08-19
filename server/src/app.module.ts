import { Module } from "@nestjs/common";
import { PokemonsModule } from "./pokemons/pokemons.module";
import { BattlesModule } from "./battles/battles.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "db/data-source";

@Module({
	imports: [
		TypeOrmModule.forRoot(dataSourceOptions),
		PokemonsModule,
		BattlesModule,
	],
})
export class AppModule {
	constructor() {}
}
