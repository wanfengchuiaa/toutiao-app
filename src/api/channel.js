import request from "@/utils/request";

export const userchannels = () => {
  return request({
    url: "/v1_0/user/channels",
  });
};

export const articles = (params) => {
  return request({
    url: "/v1_0/articles",
    params,
  });
};

export const getchannelsa = () => {
  return request({
    url: "/v1_0/channels",
  });
};

export const getuserchannels = (channel) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};

export const deleteUserChannel = (channelId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
};

export const getSearchSuggestion = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

export function getSearch(params) {
  return request({
    method: "GET",
    url: "/v1_0/search",
    params,
  });
}
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: "/v1_0/articles/" + articleId,
  });
};

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId,
    },
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`,
  });
};
