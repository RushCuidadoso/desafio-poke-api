import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";

function App() {

  const [allPokemons, setAllPokemon] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20')

  const getAllPokemons = async function(){
    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)

    function createPokemon(results){
      results.forEach(async (pokemon) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()

        setAllPokemon(currentList => [...currentList, data])
      });
    }
    createPokemon(data.results)
    await console.log(allPokemons)
  }

  useEffect(()=>{
    getAllPokemons()
  }, [])

  return (
    <div className="app-container">
      <h1>Desafio Pokemon</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) =><PokemonThumbnail id={pokemon.id} name={pokemon.name} image={pokemon.sprites.other.dream_world.front_default} type={pokemon.types[0].type.name}/> )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Carregar mais</button>
      </div>
    </div>
  );
}

export default App;
