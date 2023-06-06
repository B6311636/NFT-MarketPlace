import { CryptoHookFactory } from "@/models/hooks";
import { Nft } from "@/models/Inft";
import { formatEther, parseEther } from "ethers";
import { useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

type UseOwnedNftsResponse = {
    listNft: (tokenId: number, price: number) => Promise<void>
}
type OwnedNftsHookFactory = CryptoHookFactory<Nft[], UseOwnedNftsResponse>

export type UseOwnedNftsHook = ReturnType<OwnedNftsHookFactory>

export const hookFactory: OwnedNftsHookFactory = ({ contract }) => () => {
    const { data, ...swr } = useSWR(
        contract ? "web3/useOwnedNfts" : null,
        async () => {
            const nfts = [] as Nft[];
            const coreNfts = await contract!.getOwnedNfts();

            for (let i = 0; i < coreNfts.length; i++) {
                const item = coreNfts[i];
                const tokenURI = await contract!.tokenURI(item.tokenId);
                const metaRes = await fetch(tokenURI);
                const meta = await metaRes.json();
                const tokenId = Number(item.tokenId);

                nfts.push({
                    price: parseFloat(formatEther(item.price)),
                    tokenId: tokenId,
                    creator: item.creator,
                    isListed: item.isListed,
                    meta
                })
            }

            return nfts;
        }
    )

    const _contract = contract;
    const listNft = useCallback(async (tokenId: number, price: number) => {
        try {
            const result = _contract!.placeNftOnSale(
                tokenId,
                parseEther(price.toString()),
                {
                    value: parseEther(0.025.toString())
                }
            )

            await toast.promise(result, {
                pending: "Processing transaction",
                success: "Item has been listed",
                error: "Processing error"
            }
            );

        } catch (e: any) {
            console.error(e.message);
        }
    }, [_contract])

    return {
        ...swr,
        listNft,
        data: data || [],
    };
}