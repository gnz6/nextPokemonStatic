import { NoFav } from '@/components/ui/NoFav';
import { Layout } from '../../components/layouts/Layout';
import { useState, useEffect } from 'react';
import { localFavs } from '@/utils';
import { ShowFavs } from '@/components/ui/ShowFavs';

const Favs = () => {
  
  const [favPokemons, setFavPokemons] = useState<number[]>([])
  
  useEffect(()=>{
    setFavPokemons(localFavs.pokemons)
  },[])


  return (
    <Layout title='Favorites'>
      {
        favPokemons.length === 0
        ?<NoFav/>
        : 
       <ShowFavs pokemons={favPokemons}/>
       }

    </Layout>
  )
}

export default Favs