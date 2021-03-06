import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";
import Pagination from "./Pagination";

var loadedPages = 0
var currentPage = 1

function App() {
  // Declaração de use states para o código
  const [allPokemons, setAllPokemon] = useState([]);
  const [CurrentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon/?limit=20"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true); // Estado utilizado para indicar se a página está carregando
  // const [loadedPages, setLoadedPages] = useState(0);
  //const [currentPage, setCurrentPage] = useState(1);

  // Função que pega todos os pokemons de 20 em 20
  const getAllPokemons = function () {
    if (currentPage > loadedPages || loadedPages === 0 ) {
      loadPokemons();

      // Código utilizando localStorage, para evitar requisitar informações que já foram usadas
      // TODO fazer funcionar.
    } else {

      if (currentPage === 1) {
        for (let index = 1; index <= 20; index++) {
          let info = JSON.parse(localStorage.getItem(index));
          setAllPokemon((currentList) => [...currentList, info]);
        }
      } else {
        let showItems = 1 + (20 * (currentPage - 1)) ;
        for (let index = showItems; index <= showItems + 19; index++) {
          let info = JSON.parse(localStorage.getItem(index));
          setAllPokemon((currentList) => [...currentList, info]);
        }
      }
    }
    setLoading(false);
    // console.log("loadedPages", loadedPages);
    // console.log("currentPage", currentPage);
  };

  const loadPokemons = async function(){
    const response = await fetch(CurrentPageUrl);
      const data = await response.json();
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      createPokemon(data.results);
      loadedPages = loadedPages + 1;
      // console.log('new loaded pages', loadedPages)

      // Função que pega os detalhes dos 20 pokemons
      function createPokemon(results) {
        results.forEach(async (pokemon) => {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          );
          var data = await response.json();
          // Adiciona as informações em localStorage para utilizar depois, caso o usuário volte as páginas
          localStorage.setItem(
            data.id,
            JSON.stringify({
              id: data.id,
              name: data.name,
              sprites: {
                other:{
                  dream_world:{
                    front_default: data.sprites.other.dream_world.front_default
                  }
                }
              },
              types: [{
                type:{
                  name: data.types[0].type.name
                }
              }],
            })
          );
          // Adiciona os pokemons em uma lista para mostrar
          setAllPokemon((currentList) => [...currentList, data]);
        });
        setLoading(false);
      }
  }

  // useEffect por cada vez que a página muda, é chamada outra lista
  useEffect(() => {
    setLoading(true);
    getAllPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  // Funções de mudança de página
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    currentPage = currentPage + 1;
    setAllPokemon([]);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    currentPage = currentPage - 1;
    setAllPokemon([]);
  }

  // Mostrar caso a página está carregando
  if (loading) return <div className="app-container">"Loading..."</div>;

  return (
    <div className="app-container">
      <h1>Desafio Pokemon</h1>
      <h2>Página #{currentPage}</h2>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnail
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
            />
          ))}
        </div>
        <Pagination
          gotoNextPage={nextPageUrl ? gotoNextPage : null}
          gotoPrevPage={(currentPage !== 1) ? gotoPrevPage : null}
        />
      </div>
    </div>
  );
}

export default App;
