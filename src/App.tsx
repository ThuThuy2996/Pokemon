import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Pokemon, ViewDetail } from './interfaces';
import PokemonCollection from './components/PokemonCollection';

interface Pokemons {
  name: string;
  url: string;
}


const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl , setNextUrl] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false)
  const [pokemonDetail, setPokemonDetail] = useState<ViewDetail>({id:0,isOpen:false})


  useEffect(() => {   
    const getPokemon = async () => {   
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );        
        setPokemons((p) => [...p,poke.data]);     
        setLoading(false);       
      });
    };
    getPokemon();  
  }, []);


  const getMore = async () => {
    setLoading(true);
  let res =  await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);      
      setLoading(false);
    });
  }


  return (
  
    <div className="App">
      <div className="container">
        <header className="pokemon-header"> List Pokémon</header>
        <PokemonCollection pokemons={pokemons} viewDetail={pokemonDetail} setDetail={setPokemonDetail}/>
        <div className={pokemonDetail.isOpen ? "btn-dis": "btn"}>
          <button onClick={getMore}>{isLoading ? 'Loading...' : 'Load more'}</button>
        </div>

      </div>
    </div>
  );
}

export default App;
