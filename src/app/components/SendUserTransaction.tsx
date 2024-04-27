import { ethers } from "ethers";
import { describe } from "node:test";
import React from "react";

const SendUserTransaction = ({
  user,
  sendTransaction,
}: {
  user: any;
  sendTransaction: any;
}) => {
  const sendTx = async () => {
    const ethAmount = ethers.utils.parseEther("0.01");
    const hexAmount = ethers.utils.hexlify(ethAmount);

    const unsingedTx = {
      to: "0x9E51492A995e9275C21d79923Ed510B8B31B66C5",
      chainId: "17000",
      value: hexAmount,
    };

    const txUiConfig = {
      header: "Send Transaction",
      describe: "send 0.001 ETH",
      buttonText: "Send",
    };

    if (user.wallet) {
      const tx = await sendTransaction(unsingedTx, txUiConfig);
    }
  };
  return (
    <div className="mt-10 flex flex-col items-center border p-4 w-full">
      <button
        className="border py-2 px-10 bg-green-400 rounded-lg"
        disabled={!user.wallet}
        onClick={sendTx}
      >
        send 0.001 ETH
      </button>
      {/* {hasSigned && (
        <div className="flex justify-center flex-col items-center mt-2">
          <p> Signed message with signature </p>
          <p>{signature}</p>
        </div>
      )} */}
    </div>
  );
};

export default SendUserTransaction;
