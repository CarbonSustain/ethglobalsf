"use client";
import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

import React, { useEffect, useState } from "react";
import { ethers,formatEther } from "ethers";
import { Client } from "@xmtp/xmtp-js";

export default function Home() {
  const user = useUser();
  const { openAuthModal } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);

  const PRIVATE_KEY = "f44121975ad0b84e4b352bf4d26a061fa89415ba50d963282ec7f5cc0e7a58fa";

  const purchaseCST = async () => {
    try {
      // Add logic for purchasing CarbonSustain Token (CST)
      // This could involve calling a smart contract or an API
      console.log("Purchasing CarbonSustain Token...");
      // Example logic:
      // const response = await contract.purchaseToken();
      alert("Purchase initiated successfully!");
    } catch (error) {
      console.error("Error purchasing CST:", error);
      alert("Failed to purchase CST. Please try again.");
    }
  };

  async function checkWalletBalance(wallet) {
    try {
        // Check your wallet balance
        const balance = await wallet.getBalance();
        console.log(`Wallet balance: ${formatEther(balance)} MATIC`);

        // Now you can perform actions like sending transactions or interacting with contracts
    } catch (error) {
        console.error('Error:', error);
    }
  }
  
  // Initialize XMTP
  const initXMTP = async () => {
    console.log("initXMTP 1");
    // Create an Ethereum provider using Ethers.js
    const INFURA_URL = "https://sepolia.infura.io/v3/a0197779450c4dd39c77477a591aa247";
    const provider = new ethers.JsonRpcProvider(INFURA_URL);
    console.log("initXMTP 2");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    checkWalletBalance(wallet);

    console.log("initXMTP 3");
    // Initialize XMTP client
    const xmtp = await Client.create(wallet);
    setClient(xmtp);
    console.log("initXMTP 4");

    // Fetch or listen to new messages
    const conversations = await xmtp.conversations.list();
    if (conversations.length > 0) {
      console.log("initXMTP 5");
      const conversation = conversations[0];
      sendMessage(conversation);
      // Subscribe to incoming messages
      const stream = await conversation.streamMessages();
      stream.subscribe((msg) => {
        console.log("New message: ", msg.content);
        setMessages((prev) => [...prev, msg.content]);
      });
    } else {
      console.log("No conversations found");
    }
  };

  // Function to send a message
  const sendMessage = async (conversation) => {
    if (!client || !conversation) return;
    const newMessage = "New Message to send."
    try {
      await conversation.send(newMessage);
      console.log("Message sent:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
      initXMTP();
    } 
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      {signerStatus.isInitializing ? (
        <>Loading...</>
      ) : user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          Logged in as {user.email ?? "anon"}.
          <button className="btn btn-primary mt-6" onClick={() => purchaseCST()}>
            Purchase CarbonSustain Token
          </button>
          <div>
            <h1>XMTP Messages</h1>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
          <button className="btn btn-primary mt-6" onClick={() => logout()}>
            Log out
          </button>
        </div>
      ) : (
        <div>
        <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button className="btn btn-primary" onClick={openAuthModal}>
          Login
        </button>
      </div>

       
        
      )}
    </main>
  );
}
