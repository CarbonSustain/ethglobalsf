import React from "react";
import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { sepolia, alchemy } from "@account-kit/infra";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createPublicClient, http } from 'viem';

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [[{"type":"email"}],
              [{"type":"passkey"},
               {"type":"social","authProviderId":"google","mode":"popup"},
               {"type":"social","authProviderId":"facebook","mode":"popup"}]],
    addPasskeyOnSignup: false,
    header: <img src="path/to/logo.svg" />,
  },
};

export const config = createConfig({
  chain: sepolia,
  transport: alchemy({ apiKey: "31M8MeGE0yazWn8dlR9dHdccc9W0RR2P" }),
  ssr: true, // set to false if you're not using server-side rendering
  enablePopupOauth: true,
}, uiConfig);

export const queryClient = new QueryClient();

// React component to render the login UI
const Login: React.FC = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="login-page">
          <h1 className="text-2xl font-bold mb-6">Login to Your Account</h1>
          {/* Replace with the correct component for rendering Alchemy's login UI */}
          <AlchemyAuth config={config} />  {/* AlchemyAuth is hypothetical here, replace it with the actual component */}
        </div>
      </QueryClientProvider>
    );
  };
  
  export default Login;

  