import axios from "axios";

// Route of Stripe Subscription
export const api = axios.create({ baseURL: "/api" });
