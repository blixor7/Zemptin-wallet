"use client";

import { PrivyProvider } from "@privy-io/react-auth";

const handleLogin = () => {
  console.log("User login Successfully");
};

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      onSuccess={handleLogin}
      config={{
        loginMethods: [
          "wallet",
          "email",
          "google",
          // "twitter",
          "discord",
          "github",
        ],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        appearance: {
          theme: "dark",
          accentColor: "#676fff",
          logo: "https://www.metaline-x.com/Logo/Logo.svg",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default Providers;
