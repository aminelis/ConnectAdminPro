import axios from 'axios';
import { ADD_PDT, ADD_USER, FETCH_Pdts, FETCH_USER, SET_TOKEN, UPDATE_USER, UPDATE_PDT, DELETE_PDTS,DELETE_USER } from '../constants/constants';

export const Login = (username, password, role) => async (dispatch) => {
  try {
    const response = await axios.post('https://localhost:7013/api/Auth/login', {
      username,
      password,
      role
    }, {
      timeout: 100000 // Délai d'attente de 10 secondes
    });

    if (response.status === 200) {
      const { token } = response.data;
      dispatch(setToken(token));
      console.log('New state after setting token:', token);
    } else {
      throw new Error(`Invalid response status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const addUser = (username, role, company, status, verified, region, token) => async (dispatch) => {
  const formData = new FormData();
  
  formData.append('username', username);
  formData.append('password', username);
  formData.append('role', role);
  formData.append('company', company);
  formData.append('status', status);
  formData.append('verified', verified);
  formData.append('Region', region);
  

  try {
    const response = await axios.post(
      'https://localhost:7013/api/Auth/AddUser',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Modifier le type de contenu
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({ type: ADD_USER, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.errors) {
      const validationErrors = error.response.data.errors;
      console.error('Erreurs de validation:', validationErrors);
    } else {
      console.error('Erreur lors de lajourt de l\'utilisateur:', error);
    }
  }
};

export const UpdateUser = (Id, username, password, Photo, company, status, verified, region, token) => async (dispatch) => {
  const formData = new FormData();
  
  formData.append('id', Id);
  formData.append('username', username);
  formData.append('password', password);
  formData.append('role', "user");
  formData.append('photo', Photo);
  formData.append('company', company);
  formData.append('status', status);
  formData.append('verified', verified);
  formData.append('Region', region);
  console.log('formData',formData);
  try {
    const response = await axios.post(
      'https://localhost:7013/api/Auth/UpdateUser',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Modifier le type de contenu
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({ type: UPDATE_USER, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.errors) {
      const validationErrors = error.response.data.errors;
      console.error('Erreurs de validation:', validationErrors);
    } else {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  }
};

export const fetchUser = (userId, token) => async (dispatch) => {
  try {
    const response = await axios.get(`https://localhost:7013/api/Auth/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: FETCH_USER,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching Produits:', error);
  }
};

export const fetchAllUser = ( token) => async (dispatch) => {
  try {
    const response = await axios.get('https://localhost:7013/api/Auth/GetAllUsers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: FETCH_USER,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching Produits:', error);
  }
};


export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token
});

export const addProduit = (Photo, Name, Price, PriceSale, Colors, Status, token) => async (dispatch) => {
  const formData = new FormData();
  
  formData.append('name', Name);
  formData.append('price', Price);
  formData.append('priceSale', PriceSale);
  formData.append('colors', Colors);
  formData.append('status', Status);
  formData.append('photo', Photo);
  

  try {
    const response = await axios.post(
      'https://localhost:7013/api/Clothes/AddProduct',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Modifier le type de contenu
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({ type: ADD_PDT, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.errors) {
      const validationErrors = error.response.data.errors;

      // Vérifier et afficher les erreurs de validation pour chaque champ manquant
      if (validationErrors.Name) {
        console.error('Le champ Name est requis.');
      }
      if (validationErrors.Photo) {
        console.error('Le champ Photo est requis.');
      }
      if (validationErrors.Colors) {
        console.error('Le champ Colors est requis.');
      }
      if (validationErrors.Status) {
        console.error('Le champ Status est requis.');
      }

    } else {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
    throw error;
  }
};



export const fetchPdt = (token) => async (dispatch) => {
  
  try {
    const response = await axios.get('https://localhost:7013/api/Clothes/GetAllClothesProducts', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: FETCH_Pdts,
      payload: response.data
    });
  } catch (error) {
    console.error('Error fetching Produits:', error);
  }
};

export const UpdatePdt = (Id,Photo, Name, Price, PriceSale, Colors, Status, token) => async (dispatch) => {
  const formData = new FormData();
  
  formData.append('name', Name);
  formData.append('price', Price);
  formData.append('priceSale', PriceSale);
  formData.append('colors', Colors);
  formData.append('status', Status);
  formData.append('photo', Photo);
  

  try {
    const response = await axios.put(
      `https://localhost:7013/api/Clothes/UpdateProduct/${Id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Modifier le type de contenu
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch({ type: UPDATE_PDT, payload: response.data });
  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.errors) {
      const validationErrors = error.response.data.errors;

      // Vérifier et afficher les erreurs de validation pour chaque champ manquant
      if (validationErrors.Name) {
        console.error('Le champ Name est requis.');
      }
      if (validationErrors.Photo) {
        console.error('Le champ Photo est requis.');
      }
      if (validationErrors.Colors) {
        console.error('Le champ Colors est requis.');
      }
      if (validationErrors.Status) {
        console.error('Le champ Status est requis.');
      }

    } else {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
    throw error;
  }
};


export const deletePdt = (productId, token) => async (dispatch) => {
  try {
    // Envoyer une requête DELETE à l'API pour supprimer le produit avec l'ID spécifié
    await axios.delete(`https://localhost:7013/api/Clothes/DeleteProduct/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Dispatch de l'action pour indiquer que le produit a été supprimé avec succès
    dispatch({ type: DELETE_PDTS, payload: productId });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    // Gérer les erreurs éventuelles ici
  }
};

export const deleteUser = (UserId, token) => async (dispatch) => {
  try {
    // Envoyer une requête DELETE à l'API pour supprimer le produit avec l'ID spécifié
    await axios.delete(`https://localhost:7013/api/Auth/DeleteUser/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Dispatch de l'action pour indiquer que le produit a été supprimé avec succès
    dispatch({ type: DELETE_USER, payload: UserId });
  } catch (error) {
    console.error('Erreur lors de la suppression du User:', error);
    // Gérer les erreurs éventuelles ici
  }
};