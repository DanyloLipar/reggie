import axios from "axios";

export const APIRoutes = {
  ARTICLES: "/articles",
  AUTH_GOOGLE: "/googleLoginCallback",
  JOIN_WAITINGLIST: "/joinWaitingList",
  SEARCH: "/search",
  SEARCH_SUMMARY: "/searchSummary",
  SEARCH_DETAILS: "/searchDetails",
  FEEDBACK: "/feedback",
  EXPORT: "/exportCSV",
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default $api;
