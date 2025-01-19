import express, { Request, Response } from "express";
import axios from "axios";
import { Pokemon } from "./types";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Pokedex API!");
});

app.get("/pokemon/:name", async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon: Pokemon = response.data;
    const result = {
      name: pokemon.name,
      types: pokemon.types.map((type) => type.type.name),
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      forms: pokemon.forms.map((form) => form.name),
      imageUrl: pokemon.sprites.other["official-artwork"].front_default,
      moves: pokemon.moves.map((move) => move.move.name),
    };
    res.json(result);
  } catch (error) {
    const customError: CustomError = new Error(
      "Pokemon not in our database please check spelling"
    );
    customError.status = 500;
    res.status(customError.status).send(customError.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

interface CustomError extends Error {
  status?: number;
}
