import { Login } from "@/types/login.types";
import axiosClient from "./axios-cliend";
import { ParamPagination } from "@/types/pagination.type";

export const usersApi = {
  login(body: Login) {
    const url = "/users/login";
    return axiosClient.post(url, body);
  },

  me() {
    const url = "/users/me";
    return axiosClient.get(url);
  },

  getAll(params: ParamPagination) {
    const url = "/users";
    return axiosClient.get(url, { params });
  },

  updateStatus(_id: string, status: boolean) {
    const url = `/users/${_id}/status`;
    return axiosClient.put(url, {}, { params: { status } });
  },
};
