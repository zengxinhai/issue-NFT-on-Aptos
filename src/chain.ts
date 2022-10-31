import { AptosClient, FaucetClient, MaybeHexString, TokenClient } from "aptos";

const APTOS_NODE_URL_MAIN = 'https://fullnode.mainnet.aptoslabs.com'
const APTOS_NODE_URL_DEV = 'https://fullnode.devnet.aptoslabs.com'
const APTOS_FAUCET_URL_DEV = 'https://faucet.devnet.aptoslabs.com'

// For mainnet usage, set CHAIN_NET in .env file
const CHAIN_NET = process.env.CHAIN_NET;
export const isMainnet = CHAIN_NET === "Main";

// Initialize aptos client
// This client is used to interact with aptos blockchain
const aptosNodeUrl =  isMainnet ? APTOS_NODE_URL_MAIN : APTOS_NODE_URL_DEV;
export const aptosClient = new AptosClient(aptosNodeUrl);
export const tokenClient = new TokenClient(aptosClient);

// For dev purpose, we need to fund our account with faucet.
export const fundAccountForDev = (address: MaybeHexString) => {
  const faucetClient = new FaucetClient(APTOS_NODE_URL_DEV, APTOS_FAUCET_URL_DEV);
  faucetClient.fundAccount(address, 100_000_000);
}
