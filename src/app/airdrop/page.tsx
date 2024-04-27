"use client";
import React, { useEffect, useState } from "react";
import { usePrivy, useWallets, useLinkAccount } from "@privy-io/react-auth";
import { useLogout } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

import SignMessages from "../components/SignMessages";
import SendUserTransaction from "../components/SendUserTransaction";

const Airdrop = () => {
  const router = useRouter();
  const [selectedLink, setSelectedLink] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [embeddedWallet, setEmbeddedWallet] = useState<any>(null);

  const { authenticated, user, ready, sendTransaction, signMessage } =
    usePrivy();

  const {
    linkGoogle,
    linkEmail,
    linkWallet,
    linkGithub,
    linkDiscord,
    linkTwitter,
  } = useLinkAccount({
    onSuccess: (user, linkedAccountType) => {
      console.log("Successfully linked", user, linkedAccountType);
      // Any logic you'd like to execute if the user successfully links an account while this
      // component is mounted
    },
    onError: (error) => {
      console.log(error);
      alert(error);
      // Any logic you'd like to execute after a user exits the link flow or there is an error
    },
  });

  const linkOptions = [
    { label: "Email", action: linkEmail },
    { label: "Wallet", action: linkWallet },
    { label: "Google", action: linkGoogle },
    { label: "Github", action: linkGithub },
    { label: "Discord", action: linkDiscord },
    { label: "Twitter", action: linkTwitter },
  ];

  const handleLink = async () => {
    const selected: any = linkOptions.find(
      (options: any) => options?.label === selectedLink
    );

    if (selected) {
      selected.action();
    }
  };

  const { logout } = useLogout({
    onSuccess: () => {
      console.log("User logged out");
    },
  });

  const { wallets } = useWallets();
  console.log("Wallet Info", wallets);

  useEffect(() => {
    if (!ready) {
      return;
    } else {
      setUp();
    }

    async function setUp() {
      const embeddedWallet = wallets.find(
        (wallet) => wallet.walletClientType === "privy"
      );

      if (embeddedWallet) {
        const provider = await embeddedWallet.getEthereumProvider();
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(17000).toString(16)}` }],
        });

        const ethProviders = new ethers.providers.Web3Provider(provider);

        const walletBalance = await ethProviders.getBalance(
          embeddedWallet.address
        );
        const ethToString = ethers.utils.formatEther(walletBalance);
        setWalletBalance(ethToString);
        setEmbeddedWallet(embeddedWallet.address);
      }
    }
  }, [wallets, ready]);

  useEffect(() => {
    if (!user || !authenticated) router.replace("/");
  }, [user, authenticated]);

  if (!user) return <>No User</>;
  return (
    <div className="border flex flex-col justify-center items-center min-h-screen pb-10">
      <h1 className="font-bold text-[30px] mb-5">Airdrop</h1>

      <div className="w-full flex flex-col items-center">
        <button
          onClick={logout}
          className="border py-2 px-10 bg-red-200 rounded-lg"
        >
          Logout
        </button>
        <div className="mt-10 border p-4 w-full flex flex-col items-center">
          <p>User {user?.id} has linked the following accounts:</p>
          <ul>
            <li>Email: {user?.email ? user?.email.address : "None"}</li>
            <li>Wallet: {user?.wallet ? user?.wallet.address : "None"}</li>
            <li>Google: {user?.google ? user?.google.email : "None"}</li>
            <li>Apple: {user?.apple ? user?.apple.email : "None"}</li>
            <li>Discord: {user?.discord ? user?.discord.username : "None"}</li>
            <li>Twitter: {user?.twitter ? user?.twitter.username : "None"}</li>
            <li>GitHub: {user?.github ? user?.github.username : "None"}</li>
            <li>TikTok: {user?.tiktok ? user?.tiktok?.name : "None"}</li>
            <li>LinkedIn: {user?.linkedin ? user?.linkedin.email : "None"}</li>
            <li>
              Farcaster: {user?.farcaster ? user?.farcaster.username : "None"}
            </li>
            <li>Spotify: {user?.spotify ? user?.spotify.email : "None"}</li>
          </ul>
        </div>

        {/* Select Link */}

        <div className="gap-2 mt-10 border p-4 w-full flex justify-center">
          <select
            value={selectedLink}
            onChange={(e) => {
              setSelectedLink(e.target.value);
            }}
            name="Link"
            className="rounded px-4 py-2"
          >
            <option>Select an Account</option>
            {linkOptions.map((options, index) => (
              <option key={index}>{options.label}</option>
            ))}
          </select>

          <button
            onClick={handleLink}
            className="px-4 py-2 rounded text-white bg-green-500 hover:nbg-green-600 mr-2"
          >
            Link Selected Account
          </button>
        </div>
        <div className="mt-10 border p-4 w-full flex flex-col items-center">
          <div> The Wallet Address :{embeddedWallet}</div>
          <div className="text-center"> Wallet Balance :{walletBalance}</div>
        </div>

        <div className="w-full">
          <SignMessages user={user} signMessage={signMessage} />
        </div>

        <div className="w-full">
          <SendUserTransaction user={user} sendTransaction={sendTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Airdrop;
