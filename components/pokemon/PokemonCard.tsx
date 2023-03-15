import React from "react";
import { SmallPokemons } from "../../interfaces/pokeList";
import { Grid, Card, Row, Text } from "@nextui-org/react";

export const PokemonCard = ({ ...props }: SmallPokemons) => {
  return (
    <Grid key={props.id} xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable>
        <Card.Body css={{p: 1 }}>
          
          <Card.Image
          src={props.img} alt={props.name} width="100%" height={140}
          />
          <Card.Footer>
            <Row justify="space-between">
            <Text>
                #{props.id}
                </Text>
                <Text transform="capitalize" >
                {props.name}
                </Text>
            </Row>
          </Card.Footer >

          {/* <p>{props.url}</p> */}
        </Card.Body>
      </Card>
    </Grid>
  );
};
