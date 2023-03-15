import axios from 'axios';
export const getPokemonId = (url : string) => {
    const id = parseInt(url.split("/").slice(-2, -1).join())
    return id
}


