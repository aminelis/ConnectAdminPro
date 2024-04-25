import { ADD_PDT, FETCH_Pdts, UPDATE_PDT,DELETE_PDTS } from '../constants/constants';

const initialState = {
  products: [],
};

const productReducers = (state = initialState, action) => {
  let updatedProducts; // Déclarer la variable en dehors du switch

  switch (action.type) {
    case ADD_PDT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case FETCH_Pdts:
      return {
        ...state,
        products: action.payload, // Remplacer les produits existants par les nouveaux produits
      };
    case UPDATE_PDT:
      updatedProducts = state.products.map(product => {
        if (product.id === action.payload.id) {
          // Mettre à jour le produit avec les nouvelles données
          return action.payload;
        }
        return product;
      });
      return {
        ...state,
        products: updatedProducts,
      };
      case DELETE_PDTS:
      // Filtrer les produits pour exclure le produit supprimé
      updatedProducts = state.products.filter(product => product.id !== action.payload);
      return {
        ...state,
        products: updatedProducts,
      };
    default:
      return state;
  }
};

export default productReducers;
