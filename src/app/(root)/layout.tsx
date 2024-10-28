"use client";
import React, { FC, use, useEffect, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atoms/userAtom/userAtom";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

async function getUser() {
  const response = await fetch(`api/user`);
  const data = await response.json();
  return data;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    getUser().then((data) => {
      setUser(data.user);
    });
  }, []);

  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [], [network]);

  return (
    <ConnectionProvider endpoint="https://solana-devnet.g.alchemy.com/v2/vYa-RYjmjTm_eOz511A0gCCyS9bxvkVa">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <>
            {children}
          </>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
