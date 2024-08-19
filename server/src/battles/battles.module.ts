import { Module } from "@nestjs/common";
import { Battle } from "./battles.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BattlesService } from "./battles.service";
import { BattlesController } from "./battles.controller";
import { PokemonsModule } from "src/pokemons/pokemons.module";

@Module({
	imports: [TypeOrmModule.forFeature([Battle]), PokemonsModule],
	providers: [BattlesService],
	controllers: [BattlesController],
})
export class BattlesModule {}
