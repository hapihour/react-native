import {apiConfig} from "../config";
import {buildHeaders} from "./helper";

const { apiHost } = apiConfig;

export const setUserPushToken = async (token: string, pushToken: string): Promise<void> => {
  const url = `${apiHost}/user-push-token`;

  const res = await fetch(url, {
    headers: buildHeaders(token),
    method: "POST",
    body: JSON.stringify({
      pushToken
    })
  });

  if (!res.ok) {
    throw new Error("Unable to save push token");
  }
}
