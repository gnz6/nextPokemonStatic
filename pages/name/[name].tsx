import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../components/layouts/Layout';
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import {
    Grid,
    Card,
    Text,
    Button,
    Container,
    Image,
  } from "@nextui-org/react";import { useState } from 'react';
import { localFavs } from '@/utils';
import confetti from "canvas-confetti";


interface Props {
    pokemon: Pokemon;
  }

const PokemonByName = ({ pokemon }: Props) => {

    const [isInFavs, setisInFavs] = useState(localFavs.isFav(pokemon.id));

    const onToggle = () => {
      localFavs.toggleFav(pokemon.id);
      setisInFavs(!isInFavs)
  
      if( isInFavs )return
      confetti({
        zIndex:999,
        particleCount: 100,
        spread: 160,
        angle:-100,
        origin: {
          x:1,
          y:0
        }
      })
    };


  return (
    <Layout>
 <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                alt={pokemon.name}
                height={200}
                width={"100%"}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {" "}
                {pokemon.name}{" "}
              </Text>
              <Button 
              color={"warning"} 
              ghost={!isInFavs} 
              onClick={onToggle}>
                {isInFavs? <Text color="black"> Fav Pokemon </Text> : <Text color="white"> Add Fav</Text>}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display="flex" direction="row">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>

              <Text size={25}>
                {" "}
                {pokemon.types.length > 1 ? "Types:" : "Type: "}{" "}
              </Text>
              <Container display="flex" direction="column">
                {pokemon.types.map((type) => (
                  <Text size={30} transform="capitalize">
                    {" "}
                    {type.type.name}{" "}
                  </Text>
                ))}
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export default PokemonByName 



export const getStaticPaths: GetStaticPaths = async (ctx) => {


    const fetchPokemons = await pokeApi.get("/pokemon?limit=251")
    const allPokemons = fetchPokemons.data.results
    console.log(allPokemons);
    
    // const allPokemons = [...Array(251)].map((value, index) => `${index + 1}`);
  
    return {
      paths: allPokemons.map(({name} : Pokemon) => ({
        params: { name },
      })),
      fallback: false,
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    // console.log(params)
  
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
  
    return {
      props: {
        pokemon: data,
      },
    };
  };
  