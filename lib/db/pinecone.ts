import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
  throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({ apiKey });

const chatBotIndex = async () => {
  try {
    await pinecone.createIndex({
      name: "ai-chat-bot",
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
    throw error;
  }
};

export default chatBotIndex;
