import axios from 'axios';
import Axios from 'axios';
import { 
  WALLET_DETAILS_FAIL,
  WALLET_DETAILS_REQUEST,
  WALLET_DETAILS_SUCCESS,
  WALLET_CREATE_FAIL,
  WALLET_CREATE_REQUEST, 
  WALLET_CREATE_SUCCESS, 
  WALLET_EDIT_FAIL, 
  WALLET_EDIT_REQUEST, 
  WALLET_EDIT_SUCCESS, 
  WALLET_LIST_FAIL, 
  WALLET_LIST_REQUEST,
  WALLET_LIST_SUCCESS,
  TOKENS_TRANSFER_REQUEST,
  TOKENS_TRANSFER_SUCCESS,
  TOKENS_TRANSFER_FAIL,
  USER_ATOMIC_NFT_UPLOAD_REQUEST,
  USER_ATOMIC_NFT_UPLOAD_SUCCESS,
  USER_ATOMIC_NFT_UPLOAD_FAIL
} from '../Constants/walletConstants';



// wallet create

export const createWallet = () => async (dispatch, getState) => {
  dispatch({
    type: WALLET_CREATE_REQUEST
  });
  const { userSignin: { userInfo } } = getState();
  const user = userInfo;
  try {
    const { data } = await Axios.post('http://localhost:3333/api/wallet/walletCreate', {user}, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: WALLET_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: WALLET_CREATE_FAIL,
      payload: message
    });
  }
};

// list all wallets

export const listWallets = () => async (dispatch, getState) => {
  dispatch({
    type: WALLET_LIST_REQUEST
  })
  const {userSignin: {userInfo}} = getState();

  try {
    const { data } = await Axios.get('http://live.vinciis.in/api/wallet/wallets', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });
    dispatch({
      type: WALLET_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: WALLET_LIST_FAIL, payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
}

// get wallet details

export const getWalletDetails = (walletId) => async (dispatch, getState) => {
  dispatch ({
    type: WALLET_DETAILS_REQUEST,
    payload: walletId
  });
  const {userSignin: {userInfo}} = getState();
  try {

    const { data } = await Axios.get(`http://live.vinciis.in/api/wallet/${walletId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    localStorage.setItem("wallet", JSON.stringify(data));

    dispatch({
      type: WALLET_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {

    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: WALLET_DETAILS_FAIL,
      payload: message
    })
  }
}


// edit wallet

export const editWallet = (wallet) => async (dispatch, getState) => {
  dispatch ({
    type: WALLET_EDIT_REQUEST,
    payload: wallet
  });

  const {userSignin: {userInfo}} = getState();

  try {
    const {data} = await Axios.put(`http://live.vinciis.in/api/wallet/${wallet._id}`, wallet, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
    });

    dispatch ({
      type: WALLET_EDIT_SUCCESS,
      payload: data,
    });

  } catch (error) {

    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: WALLET_EDIT_FAIL,
      payload: message
    })
  }

}


// transfer tokens

export const transferTokens = (transfer) => async (dispatch, getState) => {
  dispatch({
    type: TOKENS_TRANSFER_REQUEST,
    payload: transfer
  });

  const {userSignin: {userInfo}} = getState();
  // const {walletDetails: {wallet}} = getState();
  
  try {

    if (transfer.ticker === 'AR') {
      const {data} = await Axios.post(`http://live.vinciis.in/api/wallet/transfer/ar`, transfer, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });
    }

    else if(transfer.ticker === 'KOII') {
      const {data} = await Axios.post(`http://live.vinciis.in/api/wallet/transfer/koii`, transfer, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });
    }

    else if(transfer.ticker === 'rat') {
      const {data} = await Axios.post(`http://live.vinciis.in/api/wallet/transfer/rat`, transfer, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      });
      dispatch({
        type: TOKENS_TRANSFER_SUCCESS,
        payload: data
      });

      console.log(`transferring ${data} `)

    } else {
      dispatch({
        type: TOKENS_TRANSFER_FAIL,
        payload: "invalid ticker"
      });
    }

  } catch (error) {
    const message = error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
    dispatch({
      type: TOKENS_TRANSFER_FAIL,
      payload: message
    });
  }
}

// atomic NFT upload
export const atomicNftUploadUser = (atomicNft) => async (dispatch, getState) => {
  console.log("starting atomic nft upload");
  try {
    dispatch({
      type: USER_ATOMIC_NFT_UPLOAD_REQUEST,
      payload: atomicNft
    });

    const {userSignin: {userInfo}} = getState();
    const {walletDetails: {wallet}} = getState();

    const {data} = await axios.post(`http://live.vinciis.in/api/wallet/uploadAtomicNft/${wallet._id}`, atomicNft, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({
      type: USER_ATOMIC_NFT_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_ATOMIC_NFT_UPLOAD_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    });
  }
}