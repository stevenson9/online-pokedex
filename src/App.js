import { useState, useEffect } from 'react';

import './App.css';
import PokeBlock from './PokeBlock';

const API_URL = "https://pokeapi.co/api/v2/"

const charizard = {
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"

}

const App = () => {

    const [pokemon, setPokemon] = useState([]);
    const [lookUpPokemon, setLookUpPokemon] = useState("");

    const searchPokemon = async (name) => {
        const response = await fetch(`${API_URL}pokemon/${name}`);
        const data = await response.json();

        setPokemon(data);
    }

    useEffect(() => {
        searchPokemon('')
    }, []);



    // when calling use "pokemon.{sprites}.{front_default}"
    return (
        <div className="app">
            <h1>Pokedex</h1>

            <div className="searchbar">
                <input
                    placeholder="Search for a pokemon!"
                    value={lookUpPokemon}
                    onChange={(e) => {
                        searchPokemon(lookUpPokemon);
                        setLookUpPokemon(e.target.value);

                    }}
                />
            </div>

            <div className="container">
                    
                <PokeBlock pokemon={pokemon} />
            </div>

        </div>
    )
}

// const App = () => {

//     return (
//         <div className='app'>

//             <h1>Pokedex</h1>

//             <div className="searchbar">
//                 <input
//                     placeholder="Search for a pokemon!" />
//             </div>
//             <div className="container">
//             </div>
//         </div>
//         )
// }

export default App;