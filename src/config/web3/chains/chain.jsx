export const  polygonMumbai = {
  id: 80001,
  network:"Mumbai",
  iconUrl: "./icons/Polygon-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Polygon",
    symbol: "MATIC",
  },

  rpcUrls:{
    default: {
      http:[
        "https://rpc-mumbai.maticvigil.com"
      ],
    },
  },

  blockExplorers: {
    default: { name: "Mumbai PolygonScan", url: "https://mumbai.polygonscan.com/"},
  },
  testnet: true,
}

export const polygon = {
  id: 137,
  network:"Polygon Mainnet",
  iconUrl: "./icons/Polygon-logo.png",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Polygon",
    symbol: "MATIC",
  },

  rpcUrls:{
    default: {
      http:[
        "https://polygon-mainnet.infura.io"
      ],
    },
  },

  blockExplorers: {
    default: { name: "PolygonScan", url: "https://polygonscan.com/"},
  },
  testnet: true,
}


