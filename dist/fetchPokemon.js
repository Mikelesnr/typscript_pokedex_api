"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios")); // Import Axios for making HTTP requests
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
// Function to fetch Pokémon data by name
function fetchPokemonByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    });
}
// Recursive function to fetch multiple Pokémon data
function fetchMultiplePokemon(names, index, result) {
    return __awaiter(this, void 0, void 0, function* () {
        if (index >= names.length)
            return result; // Base case: if index is greater than or equal to the length of names, return the result
        try {
            const pokemon = yield fetchPokemonByName(names[index]); // Fetch Pokémon data by name
            result.push(pokemon); // Add the fetched Pokémon data to the result array
            console.log(`Fetched data for ${names[index]}`); // Log the fetched Pokémon name to the console
            return fetchMultiplePokemon(names, index + 1, result); // Recursively call the function with the next index
        }
        catch (error) {
            console.error(`Error fetching data for ${names[index]}:`, error); // Log any errors that occur during the data fetching process
            return fetchMultiplePokemon(names, index + 1, result); // Recursively call the function with the next index
        }
    });
}
// Function to start fetching Pokémon data
function startFetchingPokemon() {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonData = yield fetchMultiplePokemon(pokemonNames, 0, []); // Start fetching Pokémon data from the beginning of the list
        console.log(pokemonData); // Log the fetched Pokémon data to the console
    });
}
// Start the process
startFetchingPokemon();
