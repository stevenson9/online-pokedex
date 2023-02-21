import { useState, useEffect } from 'react';

import './App.css';
import PokeBlock from './PokeBlock';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";


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

            <div class="small-middle-container shadow rounded">
                <Row>

                    <Col className="index">
                        <div>
                            <button onClick={() => controlIndexPrevious()} type="button" class="clicker rounded">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            </button>
                        </div>
                    </Col>

                    <Col className="middle">

                        <Row>
                            <h1 className="text-center pt-1 display-2"><span class="poke">Poke</span>dex</h1>
                        </Row>

                        <Row >
                            <div className="searchBar ">
                                <input
                                    placeholder="Search for a pokemon!"
                                    value={filter}
                                    onChange={(e) => { setFilter(e.target.value.toLowerCase()); setSearchNum(e.target.value); setNum(0) }}
                                    className="rounded form-outline"
                                />
                            </div>

                        </Row>
                        <Row>
                            <div className="pokemons">

                                {Object.keys(pokemonData).map((pokemonId) =>
                                    (pokemonData[pokemonId].name.includes(filter) ||
                                        (pokemonData[pokemonId].id + '').includes(searchNum))
                                    &&
                                    makePokemon(pokemonId)
                                )}

                                {List.length > 0 ? (
                                    List[num]
                                ) : (
                                    <p>There's no pokemon that match your input.</p>
                                )}

                            </div>
                        </Row>



                        <Row>
                            <div className="shinyButton">
                                <button onClick={() => setShiny(!shiny)} class="toggleShiny rounded">
                                shiny
                                </button>
                            </div>
                        </Row>
                    </Col>


                    <Col className="index">
                        <div class="increaseIndex">
                            <button onClick={() => controlIndexNext()} type="button" class="clicker rounded">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </button>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    )
}

export default App;


