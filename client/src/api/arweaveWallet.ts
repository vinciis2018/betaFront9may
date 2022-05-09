import { ArweaveWebWallet } from 'arweave-wallet-connector';

export const JWKwallet = async () => {
  const JWK = arweaveWalletConnect();
  console.log("JWK", JWK);
}

export const arweaveWalletConnect = async () => {
  try {
    const wallet = new ArweaveWebWallet({
      name: 'Blinds by Vinciis',
      logo: 'https://arweave.net/buoUnqeisaJPZw8XD1yyGh4LYvk0xMLbyFfmH-c30K0'
    })
    
    wallet.setUrl('arweave.app')
    await wallet.connect() 
    // console.log("wallet", wallet);

    if(wallet) {
      const key = await window.arweaveWallet.getActiveAddress();

      const key2 = await window.arweaveWallet.getActivePublicKey();
      // console.log("key2", key2)

      return {key, key2};
    } else {
      console.log("something went wrong")
      return false;
    }
  } catch (err: any) {
    console.log("error", err);
    throw new Error(err);
  }
}

export const disconnectArweaveWallet = async () => {
  try {
    await window?.arweaveWallet?.disconnect();
    await localStorage?.removeItem('portWallet');
    console.log("disconnect key", localStorage.getItem('portWallet'))

    return true;
  } catch (error) {
    return error
  }
}

