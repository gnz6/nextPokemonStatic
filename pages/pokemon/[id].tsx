import { Layout } from "../../components/layouts/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { Pokemon } from "@/interfaces";
import { pokeApi } from "@/api";
import {
  Grid,
  Card,
  Text,
  Button,
  Container,
  Image,
} from "@nextui-org/react";
import {  useState } from "react";
import { localFavs } from "@/utils";
import confetti from "canvas-confetti";
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage = ({ pokemon }: Props) => {

  const [isInFavs, setisInFavs] = useState(localFavs.isFav(pokemon.id));

  const [dispaySprite, setDisplaySprite] = useState("dreamWorld")


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
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  dispaySprite === "front_default"
                  ? pokemon.sprites.front_default
                  : dispaySprite === "back_default"
                  ? pokemon.sprites.back_default
                  : dispaySprite === "front_shiny"
                  ? pokemon.sprites.front_shiny
                  : dispaySprite === "back_shiny"
                  ? pokemon.sprites.back_shiny
                  : pokemon.sprites.other?.dream_world.front_default || "noImg"

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
                {isInFavs? <Text color="black" h3> Fav Pokemon </Text> : <Text color="white" h3> Add Fav</Text>}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display="flex" direction="row">
              <Image
                  src={pokemon.sprites.other?.dream_world.front_default || "noImg"}
                  alt={pokemon.name}
                  width={40}
                  height={40}
                  onClick={()=> setDisplaySprite("dreamWorld")}
                />
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  onClick={()=> setDisplaySprite("front_default")}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  onClick={()=> setDisplaySprite("back_default")}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  onClick={()=> setDisplaySprite("front_shiny")}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  onClick={()=> setDisplaySprite("back_shiny")}
                />
              </Container>

              <Text size={25}>
                {" "}
                {pokemon.types.length > 1 ? "Types:" : "Type: "}{" "}
              </Text>
              <Container display="flex" direction="column">
                {pokemon.types.map((type) => (
                  <Text size={30} transform="capitalize" key={type.type.name}>
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
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allPokemons = [...Array(251)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon){
    return {
      redirect:{ 
        destination:"/",
        permanent: false
       }
    }
  }

  return {
    props: {
      pokemon 
    },
    revalidate: 86400 // es en segundos = 1 dia
  };
};
