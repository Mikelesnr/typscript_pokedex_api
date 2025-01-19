import axios from "axios"; // Import Axios for making HTTP requests
import { Pokemon } from "./types"; // Import the Pokemon interface from types.ts

// List of 20 Pokémon names
const pokemonNames = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
];

// Function to fetch Pokémon data by name from the local API
async function fetchPokemonByName(name: string): Promise<Pokemon> {
  const response = await axios.get<Pokemon>(
    `http://localhost:3000/pokemon/${name}`
  );
  return response.data;
}

// Recursive function to fetch multiple Pokémon data
async function fetchMultiplePokemon(
  names: string[],
  index: number,
  result: Pokemon[]
): Promise<Pokemon[]> {
  if (index >= names.length) return result; // Base case: if index is greater than or equal to the length of names, return the result
  try {
    const pokemon = await fetchPokemonByName(names[index]); // Fetch Pokémon data by name
    result.push(pokemon); // Add the fetched Pokémon data to the result array
    console.log(`Fetched data for ${names[index]}`); // Log the fetched Pokémon name to the console
    return fetchMultiplePokemon(names, index + 1, result); // Recursively call the function with the next index
  } catch (error) {
    console.error(`Error fetching data for ${names[index]}:`, error); // Log any errors that occur during the data fetching process
    return fetchMultiplePokemon(names, index + 1, result); // Recursively call the function with the next index
  }
}

// Function to start fetching Pokémon data
async function startFetchingPokemon() {
  const pokemonData = await fetchMultiplePokemon(pokemonNames, 0, []); // Start fetching Pokémon data from the beginning of the list
  console.log(pokemonData); // Log the fetched Pokémon data to the console
}

// Start the process
startFetchingPokemon();
