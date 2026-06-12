import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export async function submitLead(data) {
  const res = await api.post("/leads", data);
  return res.data;
}

export async function subscribeNewsletter(email) {
  const res = await api.post("/newsletter", { email });
  return res.data;
}

export async function calculateROI(payload) {
  const res = await api.post("/roi/calculate", payload);
  return res.data;
}
