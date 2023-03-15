 const toggleFav = (id: number) => {
  let favs: number[] = JSON.parse(localStorage.getItem("favs") || "[]");

  if (favs.includes(id)) {
    favs = favs.filter((pokeId) => pokeId !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem("favs", JSON.stringify(favs))
};

const isFav = (id: number) : boolean => {

    if( typeof window === "undefined"){
        return false
    }

    const favs : number[] = JSON.parse(localStorage.getItem("favs") || "[]");
    return favs.includes(id)
  }


const pokemons =():number[] => {
  return JSON.parse(localStorage.getItem("favs") || "[]")
}
  
export default{
    toggleFav,
    isFav,
    pokemons
}