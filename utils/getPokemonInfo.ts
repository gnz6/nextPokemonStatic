import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

export const getPokemonInfo = async(nameOrId : string) => {
  


    try {
        const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);
        
        return {
            id: data.id,
            sprites: data.sprites,
            name: data.name,
            types: data.types
        }
    } catch (error) {
        console.log(error);
        return null;
    }
  
} 