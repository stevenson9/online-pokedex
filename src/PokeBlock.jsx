import React from 'react';


const PokeBlock = ({ pokemonId, name }) => {


    return (
        <div className = "pokeBlock">

            <div>
                {pokemonId}
            </div>
            <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}/>
            </div>

            <div>
                {name}
            </div>
        </div>
    )
}

export default PokeBlock;
