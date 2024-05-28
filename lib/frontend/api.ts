import axios from "axios";

export const api = axios.create({
  validateStatus: (status) => {
    return status < 500;
  },
});
