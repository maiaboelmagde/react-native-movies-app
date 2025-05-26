import FavRedTypes from "../utils/FavRedTypes";

export default FavReducer = (state=[],action)=>{
    switch (action.type) {
    case FavRedTypes.LOAD_FAVOURITES:
      return {
        ...state,
        favouriteIds: action.payload,
      };
    case FavRedTypes.ADD_FAVOURITE:
      return {
        ...state,
        favouriteIds: [...state.favouriteIds, action.payload],
      };
    case FavRedTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        favouriteIds: state.favouriteIds.filter(id => id !== action.payload),
      };
    default:
      return state;
  }
}