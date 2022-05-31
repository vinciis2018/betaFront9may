import { useQuery } from "react-query";
// sdk
import * as kweb from "@_koi/sdk/web";
let koiSDK = new kweb.Web();
import arweaveGraphql,{ SortOrder, TagOperator } from 'arweave-graphql'

// utils
import { formatDigitNumber, getNftsStats } from "services/utils";

interface Props {
  id: string;
}

const fetchArtist = async (id: string) => {
  try {
    if (!id) return undefined;
    const nftTxs = await getMyNfts(id);
    const nftKoii = await koiSDK.getNftsByOwner(id);
    const nfts = nftKoii.concat(nftTxs?.filter((tx) => {
      nftKoii.indexOf(tx) < 0
    }));
    console.log(nfts)
    const [totalAttention, totalReward] = getNftsStats(nftKoii);
    const data: { nfts: any[]; totalAttention: string; totalReward: string | number } = { nfts, totalAttention, totalReward: formatDigitNumber(totalReward) };
    return data;
  } catch (error) {
    return undefined;
  }
};

export function useArtist({ id }: Props) {
  return useQuery(`artist-${id}`, () => fetchArtist(id), {
    staleTime: 60 * 1000 * 5, // 5min cache.
    refetchOnWindowFocus: undefined
  });
}

export async function getMyNfts(walletAddress : any) {
  try {
    const result = await arweaveGraphql('arweave.net/graphql').getTransactions({
      owners: [walletAddress],
    })
    const txs = result?.transactions?.edges.filter(edge => 
      {
        if(edge.node.tags.length === 8) return edge?.node?.id
      }
    );

    const data = txs.map((tx: any) => tx.node)
    return data;
  } catch (error) {
    console.log(error)
  }
   
}
