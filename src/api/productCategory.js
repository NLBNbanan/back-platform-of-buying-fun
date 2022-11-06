import request from "@/utils/request";

export function saveProductCategoryAPI(id, name,descriptions, coverImg) {
  return request({
    url: `/api/v1/admin/product_categories/${id}`,
    method: "put",
    data: {
      name:name,
      descriptions:descriptions,
      coverImg:coverImg,
    },
  });
}

// 根据ID获取分类
export function getcategorysAPI(id) {
  return request({
    url: `/api/v1/admin/product_categories/${id}`, // 换成自己的登录接口
    method: "get",
  });
}

//删除商品分类
export function delProductCategoryAPI(id){
  return request({
    url:`/api/v1/admin/product_categories/${id}`,
    method:"delete",
  })
}

//新增商品分类
export function addProductCategoryAPI(data){
  return request({
    url:'/api/v1/admin/product_categories',
    method:"post",
    data,
  })
}