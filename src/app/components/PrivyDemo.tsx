"use client";
import React, { useEffect } from "react";
import { usePrivy, useLogin, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
const PrivyDemo = () => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();

  console.log(" ready, authenticated", ready, authenticated);

  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log("user", user, wasAlreadyAuthenticated);
      console.log("isNewUser", isNewUser);
      console.log("wasAlreadyAuthenticated", wasAlreadyAuthenticated);
      // Any logic you'd like to execute if the user is/becomes authenticated while this
      // component is mounted

      const wallet = wallets[0];
      const chainId = wallet?.chainId;
      if (chainId !== "17000") {
        await wallet?.switchChain(17000);
      }
    },
    onError: (error) => {
      console.log(error);
      // Any logic you'd like to execute after a user exits the login flow or there is an error
    },
  });

  useEffect(() => {
    if (ready && authenticated) router.replace("/airdrop");
  }, [ready, authenticated]);

  if (!ready) return <></>;
  return (
    <div className="border flex flex-col justify-center items-center min-h-screen">
      <h1 className="font-bold text-[30px] mb-5">Privy Wallet Demo</h1>

      <div className="w-full flex flex-col items-center">
        <button
          onClick={login}
          className="border py-2 px-10 bg-orange-400 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default PrivyDemo;
