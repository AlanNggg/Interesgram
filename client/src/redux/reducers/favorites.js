import { ADD_FAVORITE, REMOVE_FAVORITE } from "../constants";

const initialState = {
  favorites: [],
};

const favorites = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favorites;
