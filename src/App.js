import { useState, useEffect } from 'react';

import './App.css';
import PokeBlock from './PokeBlock';
import mockData from './mockData';
import axios from 'axios';

const API_URL = "https://pokeapi.co/api/v2/"

const charizard = {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"

}

const App = () => {

    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");




    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=1008`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    };
                });

                setPokemonData(newPokemonData);


            });


    }, []);


    const makePokemon = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];

        return <PokeBlock pokemonId={id} name={name} key={pokemonId} />
    }

    return (


        <div className="app">
            <h1>Pokedex</h1>

            <div className="searchbar">
                <input
                    placeholder="Search for a pokemon!"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div className="container">

                <div className="pokemons">
                    {Object.keys(pokemonData).map((pokemonId) =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        makePokemon(pokemonId)
                    )}
                </div>

            </div>

        </div>
    )
}

export default App;