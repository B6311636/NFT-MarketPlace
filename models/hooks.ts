import { MetaMaskInpageProvider } from "@metamask/providers";
import { BrowserProvider } from "ethers"
import { SWRResponse } from "swr";
import { NftMarketContract } from "./nftMarketContract";
import { Provider } from "ethers";


export type Web3Dependencies = {
    provider: Provider;
    contract: NftMarketContract;
    ethereum: MetaMaskInpageProvider;
    isLoading: boolean;
}

export type CryptoHookFactory<D = any, R = any, P = any> = {
    (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, R, P>
}

export type CryptoHandlerHook<D = any, R = any, P = any> = (params?: P) => CryptoSWRResponse<D, R>

export type CryptoSWRResponse<D = any, R = any> = SWRResponse<D> & R;
