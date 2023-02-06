import { IModalConfig } from '@/models/IModalModels';

/**
 * 组件配置项
 */
const defaultWidgetCofig: Array<IModalConfig> = [
  {
    id: 'editServiceID',
    label: '新建/复制/编辑服务',
    component: () => import('@/views/back/home/modals/editServiceModal.vue')
  },
  {
    id: 'addServiceData',
    label: '新建服务',
    component: () => import('@/views/back/home/modals/addDataModal.vue')
  },
  {
    id: 'viewMetaDataID',
    label: '查看元数据',
    component: () => import('@/views/back/home/modals/metaModal.vue')
  },
  {
    id: 'viewServiceMessageID',
    label: '查看服务信息',
    component: () => import('@/views/back/home/modals/serviceInfo.vue')
  },
  {
    id: 'editServiceMessageID',
    label: '编辑服务信息',
    component: () => import('@/views/back/home/modals/editServiceInfo.vue')
  },
  {
    id: 'rebuildThumbnailID',
    label: '重建缩略图/小级别预缓存',
    component: () => import('@/views/back/home/modals/cacheModal.vue')
  },
  {
    id: 'getImageURLID',
    label: '获取影像链接',
    component: () => import('@/views/back/home/modals/urlModal.vue')
  },

];

export default defaultWidgetCofig;
