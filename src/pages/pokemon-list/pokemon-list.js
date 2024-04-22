import React, { useEffect, useState } from 'react';
import {getData} from '../../clients/getData';

export function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/ability/?limit=0&offset=20');
    const [nextPage, setNextPage] = useState();
    const [previousPage, setPreviousPage] = useState();

    useEffect(() => {
      getData(url, 'GET', 'force-cache').then((data => {
        if(data){
        setPokemonList(data.results);
         setNextPage(data.next);
          setPreviousPage(data.previous);
        }
      })
    );
    }, [url]);

    return (
      <div className='col-lg-4 mx-auto'>
        <h2>Pokemon list</h2>
        <ul>
          {pokemonList.map((pokemon, index) =>
            <li key={index}>{pokemon.name}</li>
        )}
        </ul>
        <button type='button' disabled={!previousPage} onClick={() => setUrl(previousPage)}>Previous page</button>
        <button type='button' disabled={!nextPage} onClick={() => setUrl(nextPage)} >Next page</button>
      </div>
    )    
}
