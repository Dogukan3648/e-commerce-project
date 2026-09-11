import { SET_FAVORITES } from "../actionTypes";

const FAVORITES_STORAGE_KEY = "bandage-favorites";

export const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  payload: favorites,
});

export const loadFavorites = () => (dispatch) => {
  try {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_STORAGE_KEY),
    );
    dispatch(setFavorites(storedFavorites || []));
  } catch {
    dispatch(setFavorites([]));
  }
};

export const toggleFavorite = (product) => (dispatch, getState) => {
  const favorites = getState().favorites.favorites;

  const isFavorite = favorites.some((item) => item.id === product.id);

  const updatedFavorites = isFavorite
    ? favorites.filter((item) => item.id !== product.id)
    : [...favorites, product];

  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updatedFavorites));
  dispatch(setFavorites(updatedFavorites));
};
