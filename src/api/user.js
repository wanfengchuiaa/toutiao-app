import request from "@/utils/request";

export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
export const smscodes = (mobile) => {
  return request({
    method: "get",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

export const myuser = () => {
  return request({
    method: "get",
    url: "/v1_0/user",
  });
};
