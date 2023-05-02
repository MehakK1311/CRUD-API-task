import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./Helper";

export const registerFunc = async (data, header) => {
  return await commonrequest("POST", `${BASE_URL}/api/user`, data, header);
};

export const userGetFunc = async (search,page) => {
  return await commonrequest("GET", `${BASE_URL}/api/user/details?search=${search}&page=${page}`, "");
};

export const singleUserGetFunc = async(id)=>{
  return await commonrequest("GET", `${BASE_URL}/api/user/${id}`, "");
}

export const updateFunc = async (id,data, header) => {
  return await commonrequest("PUT", `${BASE_URL}/api/user/update/${id}`, data, header);
};

export const deleteFunc = async(id)=>{
  return await commonrequest("DELETE", `${BASE_URL}/api/user/delete/${id}`, {});
}