import { FunctionComponent } from "react";
import ProductItem from "./Item";
import { Nft, NftMeta } from "@/models/Inft";
import { useListedNfts } from "@/components/hooks/web3/web3";

interface ProductListProps {
    products: NftMeta[];
}

const ProductList: FunctionComponent = () => {
    const { nfts } = useListedNfts();
    return (
        <div className="mt-4 max-w-lg mx-auto grid gap-5 lg:grid-cols-5 lg:max-w-none">
            {nfts.data?.map((product) =>
                <div key={product.meta.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <ProductItem
                        product={product}
                        buyNft={product.buyNft}
                    />
                </div>
            )}
        </div>
    )
}

export default ProductList;