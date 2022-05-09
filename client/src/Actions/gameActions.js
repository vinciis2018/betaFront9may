import Axios from 'axios';
import { 
  CREATE_SCREEN_GAME_FAIL,
  CREATE_SCREEN_GAME_REQUEST, 
  CREATE_SCREEN_GAME_SUCCESS,
  DETAILS_SCREEN_GAME_FAIL,
  DETAILS_SCREEN_GAME_REQUEST,
  DETAILS_SCREEN_GAME_SUCCESS, 
  PLAY_SCREEN_GAME_FAIL, 
  PLAY_SCREEN_GAME_REQUEST, 
  PLAY_SCREEN_GAME_SUCCESS, 
  REMOVE_SCREEN_GAME_FAIL, 
  REMOVE_SCREEN_GAME_REQUEST,
  REMOVE_SCREEN_GAME_SUCCESS,
  CREATE_ASSET_GAME_FAIL,
  CREATE_ASSET_GAME_REQUEST, 
  CREATE_ASSET_GAME_SUCCESS,
  DETAILS_ASSET_GAME_FAIL,
  DETAILS_ASSET_GAME_REQUEST,
  DETAILS_ASSET_GAME_SUCCESS, 
  PLAY_ASSET_GAME_FAIL, 
  PLAY_ASSET_GAME_REQUEST, 
  PLAY_ASSET_GAME_SUCCESS, 
  REMOVE_ASSET_GAME_FAIL, 
  REMOVE_ASSET_GAME_REQUEST,
  REMOVE_ASSET_GAME_SUCCESS,
  CREATE_ADVERT_GAME_FAIL,
  CREATE_ADVERT_GAME_REQUEST,
  CREATE_ADVERT_GAME_SUCCESS,
  DETAILS_ADVERT_GAME_FAIL,
  DETAILS_ADVERT_GAME_REQUEST,
  DETAILS_ADVERT_GAME_SUCCESS,
  REMOVE_ADVERT_GAME_FAIL,
  REMOVE_ADVERT_GAME_REQUEST,
  REMOVE_ADVERT_GAME_SUCCESS,
  PLAY_ADVERT_GAME_FAIL,
  PLAY_ADVERT_GAME_REQUEST,
  PLAY_ADVERT_GAME_SUCCESS,
  CREATE_CHANNEL_GAME_FAIL,
  CREATE_CHANNEL_GAME_REQUEST, 
  CREATE_CHANNEL_GAME_SUCCESS,
  DETAILS_CHANNEL_GAME_FAIL,
  DETAILS_CHANNEL_GAME_REQUEST,
  DETAILS_CHANNEL_GAME_SUCCESS, 
  PLAY_CHANNEL_GAME_FAIL, 
  PLAY_CHANNEL_GAME_REQUEST, 
  PLAY_CHANNEL_GAME_SUCCESS, 
  REMOVE_CHANNEL_GAME_FAIL, 
  REMOVE_CHANNEL_GAME_REQUEST,
  REMOVE_CHANNEL_GAME_SUCCESS,
  CREATE_FILM_GAME_FAIL,
  CREATE_FILM_GAME_REQUEST,
  CREATE_FILM_GAME_SUCCESS,
  DETAILS_FILM_GAME_FAIL,
  DETAILS_FILM_GAME_REQUEST,
  DETAILS_FILM_GAME_SUCCESS,
  REMOVE_FILM_GAME_FAIL,
  REMOVE_FILM_GAME_REQUEST,
  REMOVE_FILM_GAME_SUCCESS,
  PLAY_FILM_GAME_FAIL,
  PLAY_FILM_GAME_REQUEST,
  PLAY_FILM_GAME_SUCCESS,
  CREATE_SHOP_GAME_FAIL,
  CREATE_SHOP_GAME_REQUEST, 
  CREATE_SHOP_GAME_SUCCESS,
  DETAILS_SHOP_GAME_FAIL,
  DETAILS_SHOP_GAME_REQUEST,
  DETAILS_SHOP_GAME_SUCCESS, 
  PLAY_SHOP_GAME_FAIL, 
  PLAY_SHOP_GAME_REQUEST, 
  PLAY_SHOP_GAME_SUCCESS, 
  REMOVE_SHOP_GAME_FAIL, 
  REMOVE_SHOP_GAME_REQUEST,
  REMOVE_SHOP_GAME_SUCCESS,
  CREATE_ITEM_GAME_FAIL,
  CREATE_ITEM_GAME_REQUEST,
  CREATE_ITEM_GAME_SUCCESS,
  DETAILS_ITEM_GAME_FAIL,
  DETAILS_ITEM_GAME_REQUEST,
  DETAILS_ITEM_GAME_SUCCESS,
  REMOVE_ITEM_GAME_FAIL,
  REMOVE_ITEM_GAME_REQUEST,
  REMOVE_ITEM_GAME_SUCCESS,
  PLAY_ITEM_GAME_FAIL,
  PLAY_ITEM_GAME_REQUEST,
  PLAY_ITEM_GAME_SUCCESS,
} from "../Constants/gameConstants"

// create screen game
export const createScreenGame = (screenId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_SCREEN_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/screen/${screenId}/createScreenGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_SCREEN_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_SCREEN_GAME_FAIL,
      payload: message
    })
  }
}

// get screen game details;
export const getScreenGameDetails = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: DETAILS_SCREEN_GAME_REQUEST,
    payload: screenId
  })
  try {
    const {data} = await Axios.get(`/api/game/screen/${screenId}/gameDetails`);
    dispatch({
      type: DETAILS_SCREEN_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_SCREEN_GAME_FAIL,
      payload: message
    })
  }
}

// remove screen game
export const removeScreenGame = (screenId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_SCREEN_GAME_REQUEST,
    payload: screenId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/screen/${screenId}/removeScreenGame`, screenId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_SCREEN_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_SCREEN_GAME_FAIL, 
      payload: message 
    });
  }
}


// play screen games
export const playScreenGames = (screenId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_SCREEN_GAME_REQUEST,
    payload: screenId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/screen/${screenId}/playScreenGame/${interaction}`, {screenId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_SCREEN_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_SCREEN_GAME_FAIL, 
    payload: message 
  });
  }
}


// create asset game
export const createAssetGame = (assetId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ASSET_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/asset/${assetId}/createAssetGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_ASSET_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_ASSET_GAME_FAIL,
      payload: message
    })
  }
}

// get asset game details;
export const getAssetGameDetails = (assetId) => async (dispatch, getState) => {
  dispatch({
    type: DETAILS_ASSET_GAME_REQUEST,
    payload: assetId
  })
  try {
    const {data} = await Axios.get(`/api/game/asset/${assetId}/gameDetails`);
    dispatch({
      type: DETAILS_ASSET_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_ASSET_GAME_FAIL,
      payload: message
    })
  }
}

// remove asset game
export const removeAssetGame = (assetId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ASSET_GAME_REQUEST,
    payload: assetId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/asset/${assetId}/removeAssetGame`, assetId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_ASSET_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_ASSET_GAME_FAIL, 
      payload: message 
    });
  }
}


// play asset games
export const playAssetGames = (assetId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_ASSET_GAME_REQUEST,
    payload: assetId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/asset/${assetId}/playAssetGame/${interaction}`, {assetId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_ASSET_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_ASSET_GAME_FAIL, 
    payload: message 
  });
  }
}


// create advert game
export const createAdvertGame = (videoId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ADVERT_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/video/${videoId}/createAdvertGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_ADVERT_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_ADVERT_GAME_FAIL,
      payload: message
    })
  }
}

// advert game details
export const getAdvertGameDetails = (videoId) => async (dispatch) => {
  dispatch({
    type: DETAILS_ADVERT_GAME_REQUEST,
    payload: videoId
  })
  try {
    const {data} = await Axios.get(`/api/game/video/${videoId}/gameDetails`);
    dispatch({
      type: DETAILS_ADVERT_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_ADVERT_GAME_FAIL,
      payload: message
    })
  }
}

// remove advert game
export const removeAdvertGame = (videoId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ADVERT_GAME_REQUEST,
    payload: videoId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/video/${videoId}/removeAdvertGame`, videoId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_ADVERT_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_ADVERT_GAME_FAIL, 
      payload: message 
    });
  }
}

// play advert games
export const playAdvertGames = (videoId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_ADVERT_GAME_REQUEST,
    payload: videoId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/video/${videoId}/playAdvertGame/${interaction}`, {videoId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_ADVERT_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_ADVERT_GAME_FAIL, 
    payload: message 
  });
  }
}



// create Channel game
export const createChannelGame = (channelId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_CHANNEL_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/channel/${channelId}/createChannelGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_CHANNEL_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_CHANNEL_GAME_FAIL,
      payload: message
    })
  }
}

// get channel game details;
export const getChannelGameDetails = (channelId) => async (dispatch, getState) => {
  dispatch({
    type: DETAILS_CHANNEL_GAME_REQUEST,
    payload: channelId
  })
  try {
    const {data} = await Axios.get(`/api/game/channel/${channelId}/gameDetails`);
    dispatch({
      type: DETAILS_CHANNEL_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_CHANNEL_GAME_FAIL,
      payload: message
    })
  }
}

// remove channel game
export const removeChannelGame = (channelId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CHANNEL_GAME_REQUEST,
    payload: channelId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/channel/${channelId}/removeChannelGame`, channelId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_CHANNEL_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_CHANNEL_GAME_FAIL, 
      payload: message 
    });
  }
}

// play channel games
export const playChannelGames = (channelId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_CHANNEL_GAME_REQUEST,
    payload: channelId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/channel/${channelId}/playChannelGame/${interaction}`, {channelId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_CHANNEL_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_CHANNEL_GAME_FAIL, 
    payload: message 
  });
  }
}



// create film game
export const createFilmGame = (filmId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_FILM_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/film/${filmId}/createFilmGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_FILM_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_FILM_GAME_FAIL,
      payload: message
    })
  }
}

// film game details
export const getFilmGameDetails = (filmId) => async (dispatch) => {
  dispatch({
    type: DETAILS_FILM_GAME_REQUEST,
    payload: filmId
  })
  try {
    const {data} = await Axios.get(`/api/game/film/${filmId}/gameDetails`);
    dispatch({
      type: DETAILS_FILM_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_FILM_GAME_FAIL,
      payload: message
    })
  }
}

// remove film game
export const removeFilmGame = (filmId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FILM_GAME_REQUEST,
    payload: filmId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/film/${filmId}/removeFilmGame`, filmId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_FILM_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_FILM_GAME_FAIL, 
      payload: message 
    });
  }
}

// play film games
export const playFilmGames = (filmId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_FILM_GAME_REQUEST,
    payload: filmId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/film/${filmId}/playFilmGame/${interaction}`, {filmId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_FILM_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_FILM_GAME_FAIL, 
    payload: message 
  });
  }
}




// create shop game
export const createShopGame = (shopId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_SHOP_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/shop/${shopId}/createShopGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_SHOP_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_SHOP_GAME_FAIL,
      payload: message
    })
  }
}

// get shop game details;
export const getShopGameDetails = (shopId) => async (dispatch, getState) => {
  dispatch({
    type: DETAILS_SHOP_GAME_REQUEST,
    payload: shopId
  })
  try {
    const {data} = await Axios.get(`/api/game/shop/${shopId}/gameDetails`);
    dispatch({
      type: DETAILS_SHOP_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_SHOP_GAME_FAIL,
      payload: message
    })
  }
}

// remove shop game
export const removeShopGame = (shopId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_SHOP_GAME_REQUEST,
    payload: shopId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/shop/${shopId}/removeShopGame`, shopId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_SHOP_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_SHOP_GAME_FAIL, 
      payload: message 
    });
  }
}

// play shop games
export const playShopGames = (shopId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_SHOP_GAME_REQUEST,
    payload: shopId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/shop/${shopId}/playShopGame/${interaction}`, {shopId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_SHOP_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_SHOP_GAME_FAIL, 
    payload: message 
  });
  }
}



// create item game
export const createItemGame = (itemId, gameData) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_ITEM_GAME_REQUEST,
    payload: gameData
  });

  const { userSignin: { userInfo } } = getState();

  try {
    const {data} = await Axios.post(`/api/game/item/${itemId}/createItemGame`, gameData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: CREATE_ITEM_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;

    dispatch({
      type: CREATE_ITEM_GAME_FAIL,
      payload: message
    })
  }
}

// item game details
export const getItemGameDetails = (itemId) => async (dispatch) => {
  dispatch({
    type: DETAILS_ITEM_GAME_REQUEST,
    payload: itemId
  })
  try {
    const {data} = await Axios.get(`/api/game/item/${itemId}/gameDetails`);
    dispatch({
      type: DETAILS_ITEM_GAME_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
    dispatch({
      type: DETAILS_ITEM_GAME_FAIL,
      payload: message
    })
  }
}

// remove item game
export const removeItemGame = (itemId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_GAME_REQUEST,
    payload: itemId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/item/${itemId}/removeItemGame`, itemId, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: REMOVE_ITEM_GAME_SUCCESS
    })
    console.log({data});

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message

    dispatch({
      type: REMOVE_ITEM_GAME_FAIL, 
      payload: message 
    });
  }
}

// play item games
export const playItemGames = (itemId, interaction) => async (dispatch, getState) => {
  dispatch({
    type: PLAY_ITEM_GAME_REQUEST,
    payload: itemId
  });
  const {userSignin: {userInfo}} = getState();
  try {
    const {data} = await Axios.post(`/api/game/item/${itemId}/playItemGame/${interaction}`, {itemId, interaction}, {
      headers : {
        Authorization: `Bearer ${userInfo.token}`
      }
    });

    dispatch({
      type: PLAY_ITEM_GAME_SUCCESS,
      payload: data, success: true
    });
  } catch (error) {
    const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message

  dispatch({
    type: PLAY_ITEM_GAME_FAIL, 
    payload: message 
  });
  }
}


