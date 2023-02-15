import axios from "axios";
import { addMovies } from './actions'


export const getMoviesThunk = (URL) => (dispatch) => {
  (async () => { await axios
    .get(URL)
    .then((res) => {
      dispatch(addMovies(res.data.results));
    })
    .catch(err => console.log('Ocorreu um erro ao processar a requisição axios em getMoviesThunk:', err))
})()};
