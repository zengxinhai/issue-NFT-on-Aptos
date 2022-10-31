import collectionConfig from "../collection-config.json";
import { aptosAccount } from "./account";
import { aptosClient, tokenClient, fundAccountForDev, isMainnet } from "./chain";

(async () => {
  console.log("=== Addresses ===");
  console.log(`Account address: ${aptosAccount.address()}`);
  console.log("");

  // Fund the account if in dev
  if (isMainnet) {
    await fundAccountForDev(aptosAccount.address());
  }

  console.log("=== Creating Collection ===");

  // Get params from config
  const collectionName = collectionConfig.collectionMeta.name;
  const collectionDesc = collectionConfig.collectionMeta.description;
  const collectionUri = collectionConfig.assets.logoUri;
  const collectionMaxAmount = collectionConfig.tokenInfo.maxSupply;

  const tokenUri = collectionConfig.assets.tokenMetadataUri;

  const feeRecipient = collectionConfig.royalty.feeRecipient;
  const royaltyPointsDenominator = 100;
  const royaltyPointsNumerator = collectionConfig.royalty.takeRate;

  // Create the collection.
  const createCollectionTxn = await tokenClient.createCollection(
    aptosAccount,
    collectionName,
    collectionDesc,
    collectionUri,
    collectionMaxAmount,
  );
  await aptosClient.waitForTransaction(createCollectionTxn, { checkSuccess: true });

  // Log the collection info after creation
  const logCollection = async () => {
    console.log("Collection info:");
    const collectionData = await tokenClient.getCollectionData(aptosAccount.address(), collectionName);
    console.log(`${collectionName}: ${JSON.stringify(collectionData, null, 4)}`);
  }
  await logCollection();

  console.log("=== Mint Token ===");

  const mintToken = async (tokenId: number) => {
    const txnHash = await tokenClient.createToken(
      aptosAccount,
      collectionName,
      `${collectionName} #${tokenId}`, // name of token, exp. Monkey #1
      `${collectionName} #${tokenId}`, // description of token
      1, // amount to mint, in most cases 1 for ERC721
      `${tokenUri}/${tokenId}.json`,
      1, // max supply for this token, set 1 for ERC721
      feeRecipient,
      royaltyPointsDenominator,
      royaltyPointsNumerator,
    );
    await aptosClient.waitForTransaction(txnHash, { checkSuccess: true });
  }
  // mint token 1 
  await mintToken(1);
  // await mintToken(2); // you can do the same with token 2

  // Log the collection info after token mint
  logCollection();
})();
