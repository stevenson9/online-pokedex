import { useState, useEffect } from 'react';

import './App.css';
import PokeBlock from './PokeBlock';
import mockData from './mockData';
import axios from 'axios';


const App = () => {

    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");
    const [searchNum, setSearchNum] = useState(1);
    let [num, setNum] = useState(0);
    const [shiny, setShiny] = useState(false);

    const List = [];


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
        List.push(<PokeBlock pokemonId={id} name={name} shiny={shiny} key={pokemonId} />);
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
                    onChange={(e) => { setFilter(e.target.value.toLowerCase()); setSearchNum(e.target.value); setNum(0) }}
                />

            
            </div>

            <div className="container">

                <div className="pokemons">

        
                    {Object.keys(pokemonData).map((pokemonId) =>
                        (pokemonData[pokemonId].name.includes(filter) || 
                        (pokemonData[pokemonId].id+'').includes(searchNum))
                         && 
                        makePokemon(pokemonId)
                    )}

     
          
                    {List.length > 0 ? (
                        List[num]
                    ) : (
                        <p>There's no pokemon that match your input.</p>
                    )}
                
         

                </div>
            </div>

            <div className="increaseIndex" >
                <button onClick={() => controlIndexNext()}>
                    next
                </button>
            </div>

            <div className="decreaseIndex" >
                <button onClick={() => controlIndexPrevious()}>
                    previous
                </button>
            </div>

            <div className="shinyButton">
                <button onClick={() => setShiny(!shiny)}>
                    shiny
                </button>
            </div>

        </div>
    )
}

export default App;