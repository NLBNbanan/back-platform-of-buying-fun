import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/api/v1/auth/manager_login", // 换成自己的登录接口
    method: "post",
    data,
  });
}

export function getInfo() {
  return request({
    url: "/api/v1/users/manager_info",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/vue-element-admin/user/logout",
    method: "post",
  });
}

// 获取用户列表
export function getUsers(per,page) {
  return request({
    url: "/api/v1/admin/users",
    method: "get",
    params:{per,page}
  });
}

// 修改用户信息
export function xiugaiuser(id, data) {
  return request({
    url: "/api/v1/admin/users/" + id,
    method: "put",
    data,
  });
}

// 根据id删除用户
export function shanchuuser(id) {
  return request({
    url: "/api/v1/admin/users/" + id,
    method: "delete",
  });
}
