import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "./pokemon.entity";
import { PokemonsService } from "./pokemons.service";
import { PokemonsController } from "./pokemons.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Pokemon])],
	providers: [PokemonsService],
	controllers: [PokemonsController],
	exports: [PokemonsService],
})
export class PokemonsModule {}
