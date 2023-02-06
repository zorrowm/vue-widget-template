const moreMenu = [
    {
        name:'修复索引',
        icon:'ant-design:tool-outlined',
        value:'toolIndex',
    },
    {
        name:'小级别预缓存',
        icon:'ant-design:cloud-download-outlined',
        value:'smallPreCache',
    },
    {
        name:'清空即时缓存',
        icon:'ant-design:clear-outlined',
        value:'cleanNowCache',
    },
    {
        name:'复制服务',
        icon:'ant-design:copy-outlined',
        value:'copySrvice',
    },
    {
        name:'编辑服务',
        icon:'ant-design:form-outlined',
        value:'editSrvice',
    },
    {
        name: '浏览TileJson',
        icon: 'ant-design:aliyun-outlined',
        value: 'seriviceTileJson'
    },
    {
        name:'查看元数据',
        icon:'ant-design:folder-view-outlined',
        value:'viewMetaData',
    },
    {
        name:'查看服务信息',
        icon:'ant-design:form-outlined',
        value:'viewServiceInfo',
    },
    {
        name:'编辑服务信息',
        icon:'ant-design:form-outlined',
        value:'editServiceInfo',
    },
    {
        name:'重建缩略图',
        icon:'ant-design:picture-outlined',
        value:'rebuildThumbnail',
    },
    {
        name:'删除服务',
        icon:'ant-design:delete-outlined',
        value:'delete',
        isdelete:true
    },
    {
        name:'获取影像链接',
        icon:'ant-design:api-outlined',
        value:'getImageURL',
    }
]
const actionMenu = [
    {
      value: "preview",
      name: "查看",
      icon: "ant-design:eye-outlined",
    },
    {
      value: "add",
      name: "添加",
      icon: "ant-design:plus-circle-outlined",
    }
  ];
 
  
  function getDefaultMenus() {
    return actionMenu;//hasData ? moreMenu1 : moreMenu2;
  }
  function getMoreMenus(hasData: boolean = true) {
    return moreMenu;
  }
  export {getDefaultMenus,getMoreMenus} ;