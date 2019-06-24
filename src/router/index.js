import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

function route (path, file, name, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: () => import('../pages' + file)
  }
}

export default new Router({
  routes: [
    route("/Login",'/Login',"Login"),
    route("/DistributorEntry/DistributorInterface",'/DistributorEntry/DistributorInterface',"DistributorInterface"),
    route("/DistributorEntry/Detail",'/DistributorEntry/Detail',"Detail"),
    route("/DistributorEntry/DistributorAppendix",'/DistributorEntry/DistributorAppendix',"DistributorAppendix"),
    // /login路径，路由到登录组件
    {
      path:"/", // 根路径，路由到 Layout组件
      component: () => import('../pages/Layout'),
      redirect:"/messagepanel",
      children:[ // 其它所有组件都是 Layout的子组件
        route("/index/dashboard","/Dashboard","Dashboard"),
        route("/messagepanel",'/messagepanel/messagepanel',"messagepanel"), //消息面板
        ///#后面的路径index/dashboard   对应带pages/producemanage/group/groupmanage
        route("/news/notifymanage/notifymanage",'/news/notifymanage/notifymanage',"NotifyManage"),
        route("/news/notifymanage/pubnotify",'/news/notifymanage/pubnotify',"pubnotify"),
        route("/producemanage/group/groupmanage",'/producemanage/group/groupmanage',"GroupManage"),
        route("/producemanage/project/projectinfomanage",'/producemanage/project/projectinfomanage',"ProjectInfoManag"),
        route("/producemanage/product/productlist",'/producemanage/product/productlist',"ProductList"),
        route("/producemanage/product/productcat",'/producemanage/product/productcat',"Productcat"),
        route("/producemanage/product/productList/TourismInformation",'/producemanage/product/TourismInformation',"TourismInformation"),
        route("/producemanage/product/productList/InventoryDistribution",'/producemanage/product/InventoryDistribution',"InventoryDistribution"),
        route("/producemanage/product/productList/appendix",'/producemanage/product/appendix',"appendix"),
        route("/producemanage/product/productList/DreferentialPolicy",'/producemanage/product/DreferentialPolicy',"DreferentialPolicy"),
        route("/ProductClassify",'/ProductClassify',"ProductClassify"),
        route("/producemanage/product/createproduct",'/producemanage/product/createproduct',"CreateProduct"),
        route("/sysmanage/userauth/rolemanage",'/sysmanage/userauth/rolemanage',"rolemanage"),
        route("/sysmanage/userauth/usermanage",'/sysmanage/userauth/usermanage',"UserManage"),
        route("/sysmanage/userauth/organmanage",'/sysmanage/userauth/organmanage',"OrganManage"),
        route("/producemanage/product/productList/RouteSetting",'/producemanage/product/RouteSetting',"RouteSetting"),
        route("/producemanage/policy/pricepolicy",'/producemanage/policy/pricepolicy',"pricepolicy"),
        route("/news/notifymanage/notifymanage",'/news/notifymanage/notifymanage',"notifymanage"),
        route("/news/notifymanage/pubnotify",'/news/notifymanage/pubnotify',"pubnotify"),
        route("/sellmanage/order/ordermanage",'/sellmanage/order/ordermanage',"ordermanage"),
        route("/resourcemanage/travelresource/worldcontinent",'/resourcemanage/travelresource/worldcontinent',"worldcontinent"),
        route("/resourcemanage/travelresource/country",'/resourcemanage/travelresource/country',"country"),
        route("/resourcemanage/travelresource/city",'/resourcemanage/travelresource/city',"city"),
        route("/resourcemanage/guideresource/guideinfomanage",'/resourcemanage/guideresource/guideinfomanage',"guideinfomanage"),
        route("/resourcemanage/attachment/attachmanage",'/resourcemanage/attachment/attachmanage',"attachmanage"),
        route("/financemanage/cost/costaudit",'/financemanage/cost/costaudit',"costaudit"),
        route("/supplymanage/supplier/suppiermanage",'/supplymanage/supplier/suppiermanage',"suppiermanage"),
        route("/supplymanage/channel/channeinfomanage",'/supplymanage/channel/channeinfomanage',"channinformanage"),
        route("/supplymanage/channel/channelmanage",'/supplymanage/channel/channelmanage',"channelmanage"),
        route("/supplymanage/distributor/distributormanage",'/supplymanage/distributor/distributormanage',"distribute"),
        route("/sysmanage/logmanage/opelog",'/sysmanage/logmanage/opelog',"opelog"),
      ]
    }
  ]
})
// /*注册页面路由*/
// var router =  new Router({
//   routes: [
//     route("/Layout",'/Layout',"liyunfei"),
// 		// /login路径，路由到登录组件

// 		route("/Login",'/Login',"Login"),
// 		route("/InfoManage",'/InfoManage',"InfoManage"),
// 		route("/City",'/City',"City"),
// 		route("/ChannelManage",'/ChannelManage',"ChannelManage"),
// 		route("/OrganizeManage",'/OrganizeManage',"OrganizeManage"),
// 		route("/ProductList",'/ProductList',"ProductList"),
// 		route("/ProInfoManage",'/ProInfoManage',"ProInfoManage"),
// 		route("/addProject",'/addProject',"addProject"),
// 		route("/UserInfoManage",'/UserInfoManage',"UserInfoManage"),
// 		route("/RoleInfoManage",'/RoleInfoManage',"RoleInfoManage"),
// 		route("/addRole",'/addRole',"addRole"),
// 		route("/TeamNumManage",'/TeamNumManage',"TeamNumManage"),
// 		route("/CreateProduct",'/CreateProduct',"CreateProduct"),
//     /*    {
//           path:"/", // 根路径，路由到 Layout组件
//           component: () => import('../pages/Layout'),
//           redirect:"/index/dashboard",
//           children:[ // 其它所有组件都是 Layout的子组件
//             route("/index/dashboard","/Dashboard","Dashboard"),
//             route("/item/category",'/item/Category',"Category"),
//             route("/item/brand",'/item/Brand',"Brand"),
//             route("/item/list",'/item/Goods',"Goods"),
//             route("/item/specification",'/item/specification/Specification',"Specification"),
//             route("/user/statistics",'/item/Statistics',"Statistics"),
//             route("/trade/promotion",'/trade/Promotion',"Promotion")
//           ]
//         }*/
//   ]
// })

