const help = {
  path: '/help/:name',
  name: 'help',
  meta: {
    title: '相关内部系统功能',
    isSystem: true
  },
  component: () => import('@/views/shared/help/index.vue')
};

export default [help];
