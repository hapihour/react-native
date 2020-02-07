import { TokenManager } from "../types";

export const validateToken = async (
  tokenManager: TokenManager
): Promise<void> => {
  console.log(`${JSON.stringify(tokenManager)}\n\n`);
  return Promise.reject("test");
};
