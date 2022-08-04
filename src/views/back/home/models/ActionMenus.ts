const actionMenu = [
  {
    value: "edit",
    name: "编辑用户",
    icon: "ant-design:form-outlined",
  },
  {
    value: "roleEdit",
    name: "编辑角色",
    icon: "ant-design:edit-outlined",
  },
  {
    value: "delete",
    name: "删除用户",
    icon: "ant-design:delete-outlined",
    isdelete:true
  }
];
const moreMenu = [
  {
    value: "userinfo",
    name: "用户详情",
    icon: "ant-design:info-outlined",
  },
];

function getDefaultMenus() {
  return actionMenu;//hasData ? moreMenu1 : moreMenu2;
}
function getMoreMenus() {
  return moreMenu;//hasData ? moreMenu1 : moreMenu2;
}
export {getDefaultMenus,getMoreMenus} ;
