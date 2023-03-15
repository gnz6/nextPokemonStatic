import { Container, Text, Image } from "@nextui-org/react";


export const NoFav = () => {
  return (
    <Container css={{
        display:"flex",
        flexDirection:"column",
        height:"calc(100vh - 100px)",
        alignItems: "center",
        justifyContent:"center",
        alignSelf:"center"
      }}>
        <Text h1>
          No Favs added
        </Text>

        <Image 
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/202.svg" 
        alt='No favs' 
        width={250} 
        height={250}
        css={{ opacity: 0.8 }}
        />

      </Container>
  )
}
