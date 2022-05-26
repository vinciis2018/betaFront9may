import Arweave from "arweave";
// import smartweave from "smartweave"
import * as SmartWeaveSDK from 'redstone-smartweave';
// utils

const arweaveOptions = {
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
};


async function initArweave() {
  let arweave;
  try {
    arweave = await poll(() => (Window).Arweave, 5000, 200);
  } catch (error) {
    arweave = Arweave;
  }
  arweave = new arweave(arweaveOptions);

  return arweave;
}


export const createGameTx = async ({ walletAddress, data }) => {
  let quantity;
  let gameContractState;

  const contractId = `ERb0h5CepgnFMpxPeaxhn9qt0iCa0U2oKIiLJYHmdQU`;
  console.log(contractId)

  try {
    // init arweave
    let arweave = await initArweave();

    await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION'])

    const input = {
      gameId: data.gameData._id,
      gameName: data.gameData.name,
      gameTitle: `${data.gameData.name}_${data.gameData.gameType}`,
      gameType: data.gameData.gameType,
      gameTags: data.gameData.tags,
      gamePage: data.gameData.gamePage,
      gameParams: data.gameParams,
    }

    const initialState = {
      ratId: input.gameId,
      owner: walletAddress,
      title: input.gameTitle,
      name: input.gameName,
      description: input.gamePage,
      gameType: input.gameType,
      gameParams: input.gameParams,
      stakes: {
        likeEP: {},
        flagEP: {},
        EPs: {},
        EPa: {}
      },
      withdraws: {},
      rewardDistributions: {
        sell: {},
        worthless: {}
      },
      locked: [],
      contentType: "application/json",
      createdAt: new Date().toString(),
      tags: input.gameTags,
      additonal: {}
    };

    if(data.gameData.gameType === `SCREEN_GAME`) {
      quantity = data.gameData.screenWorth
    } else if(data.gameData.gameType === `ADVERT_GAME`) {
      quantity = data.gameData.adWorth
    } else {
      quantity = 0;
    }

    // Create transaction

    const gameId = await createContract(initialState);
    console.log(gameId)
    const smartweave = SmartWeaveSDK.SmartWeaveWebFactory.memCachedBased(arweave).setInteractionsLoader(new SmartWeaveSDK.RedstoneGatewayInteractionsLoader("https://gateway.redstone.finance", {confirmed: true})).build();
  
    // const gameId = 'ou3pVcnIn7T7LxE1snY29b8zcoco1dS2n-b685gvJ9A'
    const contract = smartweave.contract(gameId).setEvaluationOptions({ ignoreExceptions: false});
    const {state} = await contract.readState();
    gameContractState = state;
    console.log(gameContractState)
    
    if(gameId && gameContractState) {


      // register game in ratState
      const ratResultTx = await contract.connect('use_wallet').bundleInteraction({
        function : "registerGame",
        gameContract : gameId,
        gameContractState: gameContractState,
        qty : Number(quantity),
        type : {game: data.gameData.gameType, active: true, time: new Date().toString() }
      });
      console.log("redStone-smartweave-writeInteraction:", ratResultTx);

      return {
        gameId,
        initialState,
        ratResultTx,

      };

    } else {
      console.log("Game Registration Failed, please contact moderator")
      return ("Game Registration Failed, please contact moderator")
    }
  } catch (error) {
    console.log("error", error)
    throw new Error(error);
  }
};



const createContract = async (initialState) => {
  console.log("1", initialState)
  let arweave = await initArweave();
  let tx = await arweave.createTransaction({
    data: JSON.stringify(initialState)
  });
  tx.addTag('App-Name', 'SmartWeaveContract');
  tx.addTag('App-Version', '0.3.0');
  tx.addTag('Contract-Src', `WPbOSu82Oh9uH3hcq2R51gw5uuA4R3k4C94LraVgApE`);
  tx.addTag('Content-Type', `application/json`);
  tx.addTag('Init-State', JSON.stringify(initialState));
  tx.addTag('Service-Name', 'Blinds By Vinciis');
  console.log("2", tx)
  await window.koiiWallet.sign(tx);
  await arweave.transactions.post(tx);
  // let txFee = await arweave.transactions.getPrice(tx.data_size);
  // console.log("4", txFee)
  // const tx = {id: 'PRkKmBHJ_inw-qFr5vW8URfgR8HC5i-JUmaj-2KYCuo'}
  const gameId = tx.id;
  console.log("3", gameId)

  return gameId  
}

