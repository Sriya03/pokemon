import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios';
import {Card,CardMedia,Typography} from '@mui/material'
function App() {
  const [pokemon,setPokemon]=useState('')
  const [pokeData,setPokeData]=useState({name:'' , 
    species:'',
    image:'',
    hp:''})
  const [pokemonChoosen,setChoosen]=useState('')
  const [pokeList,setList]=useState([])
  useEffect(()=>{fetchList()},[])
  async function fetchList(){
    var api='https://pokeapi.co/api/v2/pokemon/?limit=50'
    let res = await axios.get(api)
    setList(res.data.results.map((i)=>i.name))
  }
  function searchPokemon(){
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response)=>{
      setPokeData({name:pokemon , 
        species:response.data.species.name,
        image:response.data.sprites.front_default,
        hp:response.data.stats[0].base_stat,
        attack:response.data.stats[1].base_stat,
        defense:response.data.stats[2].base_stat,
        type:response.data.types[0].type.name
      })
      setChoosen(pokemon)
    })

  }
  return (
    <>
    <div className='App'>
      Search your favourite Pokemon
      <input type='text' onChange={(e)=>{setPokemon(e.target.value)}}/>
      <button onClick={searchPokemon}>Search</button><br/>Or
      <p>Select an option from below and select Search:</p>
      <select onChange={(e)=>{setPokemon(e.target.value)}}>
        {pokeList.map((i,index)=>{
          return <option key={index} value={i}>{i}</option>
        })}
      </select>

    </div>
    <div className='pokedata'>
      {!pokemonChoosen?(<h1>Choose a pokemon</h1>):(
      <Card sx={{ maxWidth: 400 }} md={{maxWidth: 500 }} className='card'>
      <CardMedia
        component="img"
        height="140"
        image={pokeData.image}
        alt="Pokemon image"
      />
        <Typography variant="h5" component="div">
          {pokeData.name}
        </Typography>
        <div>
          <p>Species:{pokeData.species}</p>
          <p>Hp:{pokeData.hp}</p>
          <p>Type:{pokeData.type}</p>
          <p>Attack:{pokeData.attack}</p>
          <p>Defense:{pokeData.defense}</p> 
        </div>
      
      </Card>)}
    </div>
    </>
  );
}

export default App;
