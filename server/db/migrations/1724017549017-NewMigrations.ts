import * as path from "path";
import * as fs from "fs";
import { MigrationInterface, QueryRunner, DataSource } from "typeorm";
import { Pokemon } from "../../src/pokemons/pokemon.entity";

export class NewMigrations1724017549017 implements MigrationInterface {
	name = "NewMigrations1724017549017";

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "battle" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "participant1Id" varchar, "participant2Id" varchar, "winnerId" varchar)`
		);
		await queryRunner.query(
			`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(50) NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" integer NOT NULL, "imageUrl" varchar NOT NULL, CONSTRAINT "UQ_1cb8fc72a68e5a601312c642c82" UNIQUE ("name"))`
		);
		await queryRunner.query(
			`CREATE TABLE "temporary_battle" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "participant1Id" varchar, "participant2Id" varchar, "winnerId" varchar, CONSTRAINT "FK_ba402dc01d005fa72011f51502c" FOREIGN KEY ("participant1Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_795d1b6f6fe3374bdc1d11d0f71" FOREIGN KEY ("participant2Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0f28157daad5bdcf01ba0c6430d" FOREIGN KEY ("winnerId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
		);
		await queryRunner.query(
			`INSERT INTO "temporary_battle"("id", "createdAt", "participant1Id", "participant2Id", "winnerId") SELECT "id", "createdAt", "participant1Id", "participant2Id", "winnerId" FROM "battle"`
		);
		await queryRunner.query(`DROP TABLE "battle"`);
		await queryRunner.query(
			`ALTER TABLE "temporary_battle" RENAME TO "battle"`
		);

		const filePath = path.join(process.cwd(), "pokemon.json");
		const jsonData = fs.readFileSync(filePath, "utf8");
		const pokemons = JSON.parse(jsonData).pokemon;

		for (const pokemon of pokemons) {
			const item = await queryRunner.manager.save(
				queryRunner.manager.create(Pokemon, pokemon)
			);
		}

		console.log("Seeding Success");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "battle" RENAME TO "temporary_battle"`
		);
		await queryRunner.query(
			`CREATE TABLE "battle" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "participant1Id" varchar, "participant2Id" varchar, "winnerId" varchar)`
		);
		await queryRunner.query(
			`INSERT INTO "battle"("id", "createdAt", "participant1Id", "participant2Id", "winnerId") SELECT "id", "createdAt", "participant1Id", "participant2Id", "winnerId" FROM "temporary_battle"`
		);
		await queryRunner.query(`DROP TABLE "temporary_battle"`);
		await queryRunner.query(`DROP TABLE "pokemon"`);
		await queryRunner.query(`DROP TABLE "battle"`);
	}
}
