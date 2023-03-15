import { Layout } from "../../components/layouts/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import {  Pokemon } from "@/interfaces";
import { pokeApi } from "@/api";
import { Grid, Card, Text, Button, Container, Image} from "@nextui-org/react"

interface Props {
  // pokemon:any
  pokemon: Pokemon;
}

const PokemonPage = ({ pokemon }: Props) => {
  // console.log(pokemon);

  return (<Layout>
    <Grid.Container css={{marginTop:"5px"}} gap={2}>
      <Grid xs={12} sm={4}>
        <Card isHoverable css={{padding:"30px"}}>
        <Card.Body>
          <Card.Image
          src={pokemon.sprites.other?.dream_world.front_default || "/no-image.png"}
          alt={pokemon.name}
          height={200}
          width={"100%"}
          />

        </Card.Body>
        </Card>
      </Grid>

      <Grid xs={12} sm={8}>
        <Card>
          <Card.Header css={{display:"flex" , justifyContent:"space-between"}}>
            <Text h1 transform="capitalize"> { pokemon.name } </Text>
            <Button color={"warning"} ghost>Add Favoutire</Button>
          </Card.Header>

          <Card.Body>
            <Text size={30}>Sprites: </Text>
            <Container display="flex" direction="row">
              <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/>
              <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/>
              <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/>
              <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/>
            </Container>
          </Card.Body>
        </Card>

      </Grid>

    </Grid.Container>


  </Layout>);
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allPokemons = [...Array(251)].map((value, index) => `${index + 1}`);

  return {
    paths: allPokemons.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};