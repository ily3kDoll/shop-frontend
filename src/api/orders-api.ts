import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cliend";

export const ordersApi = {
  getAll(params: ParamPagination) {
    const url = "/orders";
    return axiosClient(false).get(url, { params });
  },

  me() {
    const url = "/orders/me";
    return axiosClient(false).get(url);
  },

  getOne(_id: string) {
    const url = `/orders/${_id}`;
    return axiosClient(false).get(url);
  },
  changeStatus(_id: string, status: string) {
    const url = `/orders/${_id}`;
    return axiosClient(false).put(url, {}, { params: { status } });
  },
};
