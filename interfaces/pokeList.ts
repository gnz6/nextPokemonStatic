export interface SmallPokemons{
    name: string, 
    url: string
    id: number,
    img: string
}

export interface PokeRequest{
    count: number,
    next?: string,
    previous?: string,
    results : SmallPokemons[]
}


export interface PokemonImage{
    img: string
}