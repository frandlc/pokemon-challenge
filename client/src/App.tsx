import { useEffect, useState } from "react";
import { IPokemon } from "./models/IPokemon.ts";
import "./App.css";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import BigCard from "./components/BigCard.tsx";

function App() {
	const [pokemons, setPokemons] = useState<IPokemon[] | null>(null);
	const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(
		null
	);
	const [randomRival, setRandomRival] = useState<IPokemon | null>(null);
	const [winner, setWinner] = useState<IPokemon | null>(null);

	const fetchBattleWinner = async (
		participant1: IPokemon,
		participant2: IPokemon
	) => {
		const data = {
			participant1Id: participant1.id,
			participant2Id: participant2.id,
		};
		try {
			const response = await fetch("http://localhost:3000/battle", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const data = await response.json();
				setWinner(data);
			}
		} catch {
			console.log("battle request failed");
		}
	};

	const fetchPokemons = async () => {
		try {
			const response = await fetch("http://localhost:3000/pokemons", {
				method: "GET",
			});
			if (response.ok) {
				const data = await response.json();
				setPokemons(data);
			}
		} catch {
			console.log("fetch pokemons failed");
		}
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	useEffect(() => {
		if (pokemons && selectedPokemon) {
			setWinner(null);
			const possibleRivals = pokemons.filter(
				(pokemon) => pokemon.id !== selectedPokemon.id
			);
			const randomIndex = Math.floor(
				Math.random() * possibleRivals.length
			);
			setRandomRival(possibleRivals[randomIndex]);
		}
	}, [pokemons, selectedPokemon]);

	return (
		<>
			<Container fixed>
				<Typography
					variant="h1"
					align="left"
					gutterBottom
					sx={{
						fontWeight: 500,
						fontSize: "3.5rem",
						padding: "0",
					}}
				>
					Battle of Pokemon
				</Typography>
				<Box>
					<Typography
						variant="h2"
						align="left"
						gutterBottom
						sx={{ fontSize: "2.5rem", padding: "0" }}
					>
						Select your pokemon
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							padding: "0 0",
							marginBottom: "2rem",
							gap: "1rem",
							"@media (min-width:450px)": {
								flexDirection: "row",
							},
						}}
					>
						{!!pokemons &&
							pokemons.map((pokemon) => (
								<Card
									key={pokemon.id}
									onClick={() => setSelectedPokemon(pokemon)}
									sx={{
										cursor: "pointer",
										width: 150,
										height: 125,
										display: "flex",
										flexDirection: "column",
										justifyContent: "flex-start",
										alignItems: "center",
										padding: "1rem 0.5rem",
									}}
									raised
								>
									<img
										src={`${pokemon.imageUrl}`}
										width={100}
										height={100}
									/>

									<Typography
										variant="h3"
										align="left"
										sx={{
											fontSize: "1.5rem",
											fontWeight: 400,
											padding: "0.5rem",
											width: "100%",
										}}
									>
										{pokemon.name}
									</Typography>
								</Card>
							))}
					</Box>
				</Box>
				{winner && (
					<Box>
						<Typography
							sx={{
								padding: "1rem",
								border: "2px solid #000000",
								backgroundColor: "lightblue",
								marginBottom: "1rem",
								borderRadius: "0.25rem",
								fontSize: "1.5rem",
							}}
							variant="h4"
							align="left"
						>
							{winner.name + " wins!"}
						</Typography>
					</Box>
				)}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						gap: "3rem",
						flexWrap: "wrap",
						"@media (min-width:930px)": {
							flexDirection: "row",
						},
					}}
				>
					{!!selectedPokemon && (
						<BigCard selectedPokemon={selectedPokemon} />
					)}
					{!!selectedPokemon && !!randomRival && (
						<Button
							variant="contained"
							sx={{
								backgroundColor: "green",
								textTransform: "capitalize",
								fontSize: "1.25rem",
								fontWeight: 400,
							}}
							onClick={() =>
								fetchBattleWinner(selectedPokemon, randomRival)
							}
						>
							Start Battle
						</Button>
					)}
					{!!randomRival && <BigCard selectedPokemon={randomRival} />}
				</Box>
			</Container>
		</>
	);
}

export default App;
