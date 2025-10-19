import axios from "axios";

export function apiClient() {
  // const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL; // must be defined
  const baseURL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3030"; // must be defined
  if (!baseURL) throw new Error("BACKEND_URL is not defined");

  return axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      Accept: "application/json",
    },
  });
}
