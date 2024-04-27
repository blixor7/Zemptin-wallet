import { describe } from "node:test";
import React, { useState } from "react";

const SignMessages = ({
  user,
  signMessage,
}: {
  user: any;
  signMessage: any;
}) => {
  const [hasSigned, setHasSigned] = useState(false);
  const [signature, setSignature] = useState("");

  const message = "This is test message for the sign message";
  const uiConfig = {
    title: "Testing Signature Feature",
    description: "This is a demo test the signing feature",
    buttonText: "Sign the message",
  };

  const signUserMessage = async () => {
    const signature = await signMessage(message, uiConfig);
    setHasSigned(true);
    setSignature(signature);
  };

  return (
    <div className="mt-10 flex flex-col items-center border p-4 w-full">
      <button
        className="border py-2 px-10 bg-green-400 rounded-lg"
        disabled={!user.wallet}
        onClick={signUserMessage}
      >
        Sign a Message
      </button>
      {hasSigned && (
        <div className="flex justify-center flex-col items-center mt-2">
          <p> Signed message with signature </p>
          <p>{signature}</p>
        </div>
      )}
    </div>
  );
};

export default SignMessages;
