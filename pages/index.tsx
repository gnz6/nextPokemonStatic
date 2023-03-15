import { Layout } from "../components/layouts/Layout";
import { GetStaticProps } from "next";
import { pokeApi } from "@/api";
import { PokeRequest } from "@/interfaces";
import { SmallPokemons } from "../interfaces/pokeList";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import {Grid} from "@nextui-org/react"



interface Props {
  pokemons: SmallPokemons[];
}

export default function Home({ pokemons }: Props) {
  const mapPokemons: SmallPokemons[] = pokemons.map((pokemon, i) => ({
    name: pokemon.name,
    id: i + 1,
    url: pokemon.url,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`,
  }));

  return (
    <Layout title="PoKeMoN">
      <h1>Home</h1>

      <Grid.Container gap={2} justify="flex-start">

        {mapPokemons.map(({id, name, url, img}) => (
          <PokemonCard id={id} name={name} url={url} img={img}/>
          ))}
          
          </Grid.Container>

    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokeRequest>("/pokemon?limit=251");

  return {
    props: {
      pokemons: data.results,
    },
  };
};
