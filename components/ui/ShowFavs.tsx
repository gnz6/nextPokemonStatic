import { Grid } from "@nextui-org/react";
import { FavCard } from "./FavCard";

interface Props {
  pokemons: number[];
}

export const ShowFavs = ({ pokemons }: Props) => {

 

  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {pokemons.map((id) => (
        <FavCard id={id}/>
      ))}
    </Grid.Container>
  );
};
