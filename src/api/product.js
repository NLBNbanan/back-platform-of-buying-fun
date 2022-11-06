import request from "@/utils/request";

// 获取分类
export function loadcategorys() {
  return request({
    url: "/api/v1/admin/product_categories", // 换成自己的登录接口
    method: "get",
  });
}

// 添加商品

export function addproduct(data) {
  return request({
    url: "/api/v1/admin/products", // 换成自己的登录接口
    method: "post",
    data,
  });
}

// 获取商品列表
export function loadproducts(data) {
  return request({
    url: "/api/v1/admin/products", // 换成自己的登录接口
    method: "get",
    params: data,
  });
}

/* export function saveProductAPI(id,data){
  return request({
    url:'/api/v1/admin/products/'+id,
    method:'put',
    data,
    headers:{
      'content-type':'application/x-www-form-urlencoded'
    }
  })
} */
//put传参和get传参，要注意数据结构，不能直接传data对象进去，当然这个是可以和后端商量的
export function saveProductAPI(
  id,
  name,
  price,
  descriptions,
  quantity,
  coverImg,
  productCategory
) {
  return request({
    url: `/api/v1/admin/products/${id}`,
    method: "put",
    data: {
      name: name,
      price: price,
      descriptions: descriptions,
      quantity: quantity,
      coverImg: coverImg,
      productCategory: productCategory,
    },
  });
}



export function delProductAPI(id){
  return request({
    url:'/api/v1/admin/products/'+id,
    method:'delete',
  })
}