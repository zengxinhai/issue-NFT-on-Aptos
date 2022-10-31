// Initialize dotenv
import dotenv from 'dotenv';
dotenv.config();

import { AptosAccount } from "aptos";

const PRIV_KEY = process.env.PRIV_KEY;

// AptosAccount accepts unit8array as private key, so we need this helper function
const fromHexStringToUnit8Array = (hexString: string) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const PRIV_KEY_ARR = fromHexStringToUnit8Array(PRIV_KEY);

export const aptosAccount = new AptosAccount(PRIV_KEY_ARR);
