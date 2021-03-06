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

/**
 * 收藏文章
 */
export const addCollect = (target) => {
  return request({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target,
    },
  });
};

/**
 * 取消收藏文章
 */
export const deleteCollect = (target) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/collections/${target}`,
  });
};

export const addLike = (articleId) => {
  return request({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target: articleId,
    },
  });
};

/**
 * 取消点赞
 */
export const deleteLike = (articleId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${articleId}`,
  });
};

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = (target) => {
  return request({
    method: "GET",
    url: "/v1_0/user/profile",
    params: {
      target,
    },
  });
};

/**
 * 更新用户资料
 */
export const updateUserProfile = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/profile",
    data,
  });
};

/**
 * 更新用户照片资料
 */
export const updateUserPhoto = (data) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/photo",
    data,
  });
};
