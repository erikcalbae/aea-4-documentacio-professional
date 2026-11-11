const API_KEY = '1a07dfb7'
const URL = 'https://www.omdbapi.com/'

export async function buscarPelicules(text) {
  const resposta = await fetch(
    `${URL}?apikey=${API_KEY}&s=${text}`
  )

  return await resposta.json()
}

export async function obtenirDetallPelicula(imdbID) {
  const resposta = await fetch(
    `${URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  )

  return await resposta.json()
}