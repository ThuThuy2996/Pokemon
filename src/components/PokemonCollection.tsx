import React from 'react'
import { ViewDetail, Pokemon, PokemonDetail } from '../interfaces';
import PokemonList from './PokemonList';
import './pokemon.css'

interface Props {
    pokemons: PokemonDetail[];
    viewDetail: ViewDetail;
    setDetail : React.Dispatch<React.SetStateAction<ViewDetail>>
  }

const PokemonCollection:React.FC<Props> = (props) => {
    const {pokemons,viewDetail, setDetail} = props;
    const viewThisPokemon = (id : number) => {
        if(!viewDetail.isOpen)
        setDetail({id:id, isOpen:true});
    }
  return (
    <>
    <section className={viewDetail.isOpen ? "collection-container-active": "collection-container"} >
        {pokemons.map((pokemon) =>{
            return (
                <div  onClick={() => viewThisPokemon(pokemon.id)} >
                    <PokemonList
                    viewDetail={viewDetail}
                    setDetail={setDetail}
                    key={pokemon.id}                   
                    name={pokemon.name}
                    id={pokemon.id}
                    image={pokemon.sprites.front_default}
                    abilities = {pokemon.abilities}
                    />
                </div>
            )
        })}
    </section>
    </>
  )
}

export default PokemonCollection