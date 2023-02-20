import { useState, useEffect } from 'react';

import './App.css';
import PokeBlock from './PokeBlock';
import mockData from './mockData';
import axios from 'axios';


const App = () => {

    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    let [num, setNum] = useState(0);

    const List = []


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
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);


    const makePokemon = (pokemonId) => {
        const { id, name } = pokemonData[pokemonId];
        List.push(<PokeBlock pokemonId={id} name={name} key={pokemonId} />);
    }

    const controlIndexNext = () => {
        if (num + 1 == List.length) {
            return setNum(0);
        }
        setNum(num + 1);
        console.log(List)
    }

    const controlIndexPrevious = () => {
        if (num - 1 == -1) {
            return setNum(List.length - 1);
        }
        setNum(num - 1);
    }


    return (
        <div className="app">
            <h1>Pokedex</h1>

            <div className="searchbar">
                <input
                    placeholder="Search for a pokemon!"
                    value={filter}
                    onChange={(e) => { setFilter(e.target.value); setNum(0) }}
                />
            </div>

            <div className="container">

                <div className="pokemons">

                    {Object.keys(pokemonData).map((pokemonId) =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        makePokemon(pokemonId)
                    )}
                    {List[num]}

                </div>
            </div>

            <div className="increaseIndex" onClick={() => controlIndexNext()}>
                <button >
                    next
                </button>
            </div>

            <div className="decreaseIndex" onClick={() => controlIndexPrevious()}>
                <button >
                    previous
                </button>
            </div>

        </div>
    )
}

export default App;