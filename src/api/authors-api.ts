import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-cliend";
import { CreateAuthor } from "@/types/author.type";

export const authorsApi = {
  getAll(params: ParamPagination) {
    const url = "/authors";
    return axiosClient(true).get(url, { params });
  },
  getAllName() {
    const url = "/authors/all";
    return axiosClient(true).get(url);
  },
  create(body: CreateAuthor) {
    const url = "/authors";
    return axiosClient(true).post(url, body);
  },
  get(id: string) {
    const url = `/authors/${id}`;
    return axiosClient(true).get(url);
  },
  delete(id: string) {
    const url = `/authors/${id}`;
    return axiosClient(true).delete(url);
  },
  update(id: string, body: CreateAuthor) {
    const url = `/authors/${id}`;
    return axiosClient(true).put(url, body);
  },
};
