import { Card, Divider, LinearProgress, Typography } from "@mui/material";
import { IPokemon } from "../models/IPokemon";

const BigCard = ({ selectedPokemon }: { selectedPokemon: IPokemon }) => {
	return (
		<Card
			raised
			sx={{
				width: "175px",
				padding: "1rem",
				"@media (min-width:450px)": {
					width: "250px",
				},
			}}
		>
			<img src={`${selectedPokemon.imageUrl}`} width={150} height={150} />
			<Typography
				variant="h3"
				align="left"
				sx={{
					fontSize: "1.5rem",
					fontWeight: 400,
					padding: "0",
					width: "100%",
				}}
			>
				{selectedPokemon.name}
			</Typography>
			<Divider sx={{ margin: "0.5rem 0" }} />
			<Typography>Attack</Typography>
			<LinearProgress
				variant="determinate"
				value={selectedPokemon.attack * 10}
				sx={{
					height: "7px",
					borderRadius: "8px",
					background: "lightgray",
					"& .MuiLinearProgress-bar": {
						backgroundColor: "lightgreen",
					},
				}}
			/>
			<Typography>Defense</Typography>
			<LinearProgress
				variant="determinate"
				value={selectedPokemon.defense * 10}
				sx={{
					height: "7px",
					borderRadius: "8px",
					background: "lightgray",
					"& .MuiLinearProgress-bar": {
						backgroundColor: "lightgreen",
					},
				}}
			/>
			<Typography>HP</Typography>
			<LinearProgress
				variant="determinate"
				value={selectedPokemon.hp * 10}
				sx={{
					height: "7px",
					borderRadius: "8px",
					background: "lightgray",
					"& .MuiLinearProgress-bar": {
						backgroundColor: "lightgreen",
					},
				}}
			/>
			<Typography>Speed</Typography>
			<LinearProgress
				variant="determinate"
				value={selectedPokemon.speed * 10}
				sx={{
					height: "7px",
					borderRadius: "8px",
					background: "lightgray",
					"& .MuiLinearProgress-bar": {
						backgroundColor: "lightgreen",
					},
				}}
			/>
		</Card>
	);
};

export default BigCard;
