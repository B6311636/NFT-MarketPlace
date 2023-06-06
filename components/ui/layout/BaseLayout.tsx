import { FunctionComponent, ReactNode, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useWeb3 } from "@/components/providers/web3/web3";

interface BaseLayoutProps {
    children: ReactNode;
}

const BaseLayout: FunctionComponent<BaseLayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className="py-10 bg-gray-50 overflow-hidden min-h-screen">
                <div className="max-w-7xl mx-auto px-2 space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </>
    )
}

export default BaseLayout;