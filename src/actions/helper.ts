export const buildHeaders = (token: string): Headers => {
  return new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
};
