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
const express_1 = __importDefault(require("express")); // Import Express and types for Request and Response
const axios_1 = __importDefault(require("axios")); // Import Axios for making HTTP requests
const app = (0, express_1.default)(); // Create an instance of the Express application
const port = 3000; // Set the port number to 3000
// Define a route for the root URL ('/')
app.get("/", (req, res) => {
    res.send("Welcome to the Pokedex API!"); // Send a welcome message as the response
});
// Define a route for fetching Pokémon data by name ('/pokemon/:name')
app.get("/pokemon/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params; // Extract the Pokémon name from the request parameters
    try {
        // Use Axios to make a GET request to the PokeAPI to fetch data for the specified Pokémon
        const response = yield axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = response.data; // Type the response data as Pokemon
        // Map the response data to a custom format
        const result = {
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            abilities: pokemon.abilities.map((ability) => ability.ability.name),
            forms: pokemon.forms.map((form) => form.name),
            imageUrl: pokemon.sprites.other["official-artwork"].front_default,
            moves: pokemon.moves.map((move) => move.move.name),
            types: pokemon.types.map((type) => type.type.name),
        };
        res.json(result); // Send the formatted data as a JSON response
    }
    catch (error) {
        // Handle any errors that occur during the data fetching process
        const customError = new Error("Error fetching data from PokeAPI");
        customError.status = 500; // Set the status code to 500
        res.status(customError.status).send(customError.message); // Send the error message as the response
    }
}));
// Start the Express server and listen on the specified port (3000)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log a message to the console indicating that the server is running
});
