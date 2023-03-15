import { useTheme, Text, Spacer, Container } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import NextLink from "next/link";

export const Navbar = () => {
  const { theme, isDark } = useTheme();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "0px 20px",
        backgroundColor: theme?.colors.gray50.value,
      }}
    >
      <Image
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png"
        }
        alt="icono Scyther"
        width={70}
        height={70}
      />

      <NextLink href="/" passHref>
        <Container
          display="flex"
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Text color="yellow" h2>
            P
          </Text>

          <Text color="yellow" h3>
            okémon
          </Text>
        </Container>
      </NextLink>
      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favs">
        <Text color="white" css={{marginRight:"20px"}}>Favs</Text>
      </NextLink>
    </div>
  );
};
