import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: pokemonName,
    species: "", 
    img: "", 
    hp: "", 
    attack: "", 
    defense: "", 
    type: "", 
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=> {
      console.log(response);
      setPokemon({
        name: pokemonName,
        species: response.data.species.name, 
        img: response.data.sprites.front_default, 
        hp: response.data.stats[0].base_stat, 
        attack: response.data.stats[1].base_stat, 
        defense: response.data.stats[2].base_stat, 
        type: response.data.types[0].type.name, 
      });
      setPokemonChosen(true);
    });
  };

  return (
    <div className="App">
      <div className="TitleSection">
      <h1>Pokemon Stats</h1>
      <input type='text' placeholder='Enter Pokemon Name' onChange={(event) => {setPokemonName(event.target.value);}} />
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className='DisplayPokemon'>
        {!pokemonChosen ? (
        <>
        <h1>Please choose a Pokemon</h1>
        <img className='pokemonImg' src='https://images2.alphacoders.com/718/thumbbig-718222.webp  ' />
        </>
        ) : 
        (
        <>
        <h1>{pokemon.name}</h1>
        <img className='pokImg' src={pokemon.img} />
        <h3>Species: {pokemon.species}</h3>
        <h3>Type: {pokemon.type}</h3>
        <h3>Hp: {pokemon.hp}</h3>
        <h3>Attack: {pokemon.attack}</h3>
        <h3>Defense: {pokemon.defense}</h3>
        </>
        )}
      </div>
    </div>
  );
}

export default App;
