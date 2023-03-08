import axios from "axios";

export const APIRoutes = {
  AUTH_GOOGLE: "/googleLoginCallback",
  JOIN_WAITINGLIST: "/joinWaitingList",
  SEARCH: "/search",
  SEARCH_SUMMARY: "/searchSummary",
  SEARCH_DETAILS: "/searchDetails",
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default $api;
