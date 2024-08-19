import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
	type: "sqlite",
	database: "pokemon",
	entities: ["dist/src/**/*.entity.js"],
	synchronize: false,
	migrations: ["dist/db/migrations/*.js"],
	migrationsTableName: "migrations",
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
