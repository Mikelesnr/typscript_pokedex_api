import express, { Request, Response } from "express"; // Import Express and types for Request and Response
import axios from "axios"; // Import Axios for making HTTP requests
import { Pokemon } from "./types"; // Import the Pokemon interface from types.ts

const app = express(); // Create an instance of the Express application
const port = 3000; // Set the port number to 3000

// Define a route for the root URL ('/')
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Pokedex API!"); // Send a welcome message as the response
});

// Define a route for fetching Pokémon data by name ('/pokemon/:name')
app.get("/pokemon/:name", async (req: Request, res: Response) => {
  const { name } = req.params; // Extract the Pokémon name from the request parameters
  try {
    // Use Axios to make a GET request to the PokeAPI to fetch data for the specified Pokémon
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const pokemon: Pokemon = response.data; // Type the response data as Pokemon

    // Map the response data to a custom format
    const result = {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      forms: pokemon.forms.map((form) => form.name),
      imageUrl: pokemon.sprites.other["official-artwork"].front_default,
      types: pokemon.types.map((type) => type.type.name),
    };

    res.json(result); // Send the formatted data as a JSON response
  } catch (error) {
    // Handle any errors that occur during the data fetching process
    const customError: CustomError = new Error(
      "Error fetching data from PokeAPI"
    );
    customError.status = 500; // Set the status code to 500
    res.status(customError.status).send(customError.message); // Send the error message as the response
  }
});

// Start the Express server and listen on the specified port (3000)
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating that the server is running
});

// Define a custom error type (CustomError) to handle errors
interface CustomError extends Error {
  status?: number; // Add an optional status property
}
