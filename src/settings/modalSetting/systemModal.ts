import { IModalConfig } from '@/models/IModalModels';

/**
 * 组件配置项
 */
const defaultModalConfig: Array<IModalConfig> = [
  {
    id: 'changeMyPWD',
    label: '修改自己的密码',
    component: () => import('@/components/User/ChangePwd.vue')
  }, 
];

export default defaultModalConfig;
