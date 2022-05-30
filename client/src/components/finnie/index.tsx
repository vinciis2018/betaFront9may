import React, { ReactNode } from "react";
// api
import { getAddress, getBalances, getExhangeRate, getHistoricalData, getLastTransaction, getPrice } from "api/sdk";
import { connectToExtension, disconnectExtension, initExtension } from "api/finnie";
// utils
import { toast } from "services/utils";
import { arweaveWalletConnect } from "api/arweaveWallet";
import {USER_SIGNOUT} from "../../Constants/userConstants"

//blinds
// import { getMyTxns } from "api/vertoProtocol";

interface ContextInterface {
  state: any;
  dispatch: any;
}

const Context = React.createContext<ContextInterface | null>(null);
Context.displayName = "FinnieContext";

const actionTypes = {
  changeValue: "CHANGE_VALUE"
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actionTypes.changeValue:
      const { payload } = action;
      return { ...state, ...payload };
    default:
      throw new Error(`No action type found for finnieReducer`);
  }
};

const initializer = () => {
  return {
    walletAddress: null,
    walletBalance: null,
    isError: false,
    isLoading: false,
    isFinnieConnected: false
  };
};

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, null, initializer);

  /* Helper Functions */
  const connectFinnie = async (isAsync: boolean = false) => {
    let address;
    let balance: any;
    let price: any;
    let exchangeRate: any;
    let transaction: any;
    let tokenHistory: any;
    try {
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: true, isError: null, isFinnieConnected: false }
      });
      toast({ title: "Connecting..." });
      // Check if extension exists and get permissions.
      await initExtension();
      // Connect to extension
      await connectToExtension();
      // Get finnie address
      await getAddress().then(async res => {
        if (res.status === 200) {
          /* Done, we have the address */
          address = res?.data;

          await getBalances(res?.data).then(res => {
            balance = res;
          });

          await getPrice(res?.data).then(res => {
            // console.log("res", res)
            price = res;
          });

          await getExhangeRate({
            to: "INR",
            from: "USD",
            quant: "1"
          }).then(res => {
            exchangeRate = res
          });

          await getLastTransaction({
            walletAddress: address
          }).then(res => {
            // console.log("my txn", res);
            transaction = res
          })
          
          await getHistoricalData({
            ticker: "AR"
          }).then(res => {
            tokenHistory = res
          })
      
          dispatch({
            type: "CHANGE_VALUE",
            payload: { 
              walletAddress: address, 
              isFinnieConnected: true, 
              isLoading: false, 
              isError: null, 
              walletBalance: balance, 
              walletPrice: price, 
              xchangeRate: exchangeRate,
              lastTxn: transaction,
              tokenHis: tokenHistory
            }
          });
          toast({ status: "success", title: "Connected" });
          return balance;
        } else {
          throw new Error("Error getting finnie address!");
        }
      });
    } catch (error: any) {
      toast({ status: "error", title: "Error connecting finnie" });
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: false, isError: error, walletAddress: null, isFinnieConnected: false }
      });
      if (isAsync) {
        throw { message: "Error connecting finnie" };
      }
    }
    return address;
  };


  const disconnectFinnie = async () => {
    // Check if extension exists and get permissions.

    await disconnectExtension();
    await window?.arweaveWallet?.disconnect();
    localStorage.removeItem('portWallet')

    dispatch({
      type: "CHANGE_VALUE",
      payload: {
        walletAddress: null,
        walletBalance: null,
        isError: false,
        isLoading: false,
        isFinnieConnected: false
      }
    });

  };

  return <Context.Provider value={{ state: { ...state, connectFinnie, disconnectFinnie }, dispatch }}>{children}</Context.Provider>;
};

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useFinnie must be used inside FinnieProvider`);
  }
  return context;
}

export { ContextProvider as FinnieProvider, useContext as useFinnie };
