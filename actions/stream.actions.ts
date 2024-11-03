"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;
const apiSecret = process.env.STREAM_SECRET_KEY as string;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("User not found");
  }
  if (!apiKey || !apiSecret) {
    throw new Error("Stream API key or secret is not set");
  }

  const client = new StreamClient(apiKey, apiSecret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.round(new Date().getTime() / 1000) - 60;

  const token = client.generateUserToken({
    user_id: user.id,
    exp,
    iat: issued,
  });

  return token;
};