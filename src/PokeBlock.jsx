import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from 'react-bootstrap/Stack';

const PokeBlock = ({ pokemonId, name, shiny }) => {

    const pickImage = () => {
        if (shiny) {
            return <img class="pokeimage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`} />
        }

        return <img class="pokeimage" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} />
    }


    return (
        <div className="pokeBlock">
            <Stack gap={2}>
                <div>

                    {pokemonId}

                </div>

                <div>
                    {pickImage()}
                </div>

                <div>

                    {name.charAt(0).toUpperCase() + name.slice(1)}

                </div>
            </Stack>
        </div>
    )
}

export default PokeBlock;
