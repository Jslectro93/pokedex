// const BASE_API = "https://pokeapi.co/api/v2/";

// export async function getPokemon(id) {
//   const response = await fetch(`${BASE_API}pokemon/${id}/`);
//   const data = await response.json();
//   // VALIDAR ERRORES
//   return data;
// }

// export async function getSpecies(id) {
//   const response = await fetch(`${BASE_API}pokemon-species/${id}/`);
//   const data = await response.json();
//   return data;
// }

const BASE_API = 'https://pokeapi.co/api/v2/'

async function endpoint(uri) {
  const res = await fetch(BASE_API + uri)
  if( ! res.ok) {
    const msg = `Error: ${res.status}`
    throw new Error(msg)
  }
  const data = await res.json()
  return data
}

async function getPokemon(id) {
  const data = await endpoint(`pokemon/${id}/`)
  return data
}

async function getSpecies(id) {
  const data = await endpoint(`pokemon-species/${id}/`)
  return data
}

export { getPokemon, getSpecies }