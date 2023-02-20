import React from 'react';



const PokeBlock = ({ pokemonId, name, shiny }) => {

    const pickImage = () => {
        if (shiny) {
            return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`}/>
        }
    
        return <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}/>
    }
    

    return (
        <div className = "pokeBlock">

            <div>
                {pokemonId}
            </div>
            <div>
                
                {pickImage()}
                
            </div>

            <div>
                {name}
            </div>
        </div>
    )
}

export default PokeBlock;
