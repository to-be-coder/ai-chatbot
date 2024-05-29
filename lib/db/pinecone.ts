import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw new Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({ apiKey });

const indexName = "ai-chat-bot";

const createPineconeIndex = async () => {
  try {
    await pinecone.createIndex({
      name: indexName,
      dimension: 1536,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    console.log("Index created successfully.");
  } catch (error) {
    console.error("Error creating index:", error);
  }
};

(async () => {
  await createPineconeIndex();
})();

const chatBotIndex = pinecone.index(indexName);

export default chatBotIndex;
