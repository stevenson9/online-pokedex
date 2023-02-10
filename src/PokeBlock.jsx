import React from 'react';


const PokeBlock = ({ pokemon }) => {
    return (
        <div className = "pokeBlock">

            <div>
                <p>{pokemon.id}</p>
            </div>

            <div>

                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
            </div>
            <div>
                <p>{pokemon.name}</p>
            </div>

        </div>
    )
}

export default PokeBlock;
