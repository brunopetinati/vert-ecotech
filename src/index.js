import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import store from "./store"
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { polygon, polygonMumbai  } from "wagmi/chains";
import {
  trustWallet,
  metaMaskWallet,
  injectedWallet,
} from "@rainbow-me/rainbowkit/wallets";


const { chains, provider } = configureChains(
  [

    polygon,
    polygonMumbai,
  ],
  [
    alchemyProvider({
      apiKey: "39uCgesWPNf9Ukb3wl2CeNj1HhDWO7pK",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);
const connectors = connectorsForWallets([
  {
    groupName: "Vert Testing",
    wallets: [
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
      injectedWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
              initialChain={polygonMumbai}
              theme={lightTheme({
                accentColor: "#F4911A",
                accentColorForeground: "white",
                borderRadius: "small",
                fontStack: "system",
                overlayBlur: "small",
              })}
            >
      <App />  
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();