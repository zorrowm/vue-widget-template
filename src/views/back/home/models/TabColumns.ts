const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '别名',
    dataIndex: 'aliasname'
  },
  {
    title: '所属数据集',
    dataIndex: 'dataset'
  },
  {
    title: '数据量',
    dataIndex: 'countdata'
  },
  {
    title: '瓦片方案',
    dataIndex: 'rule',
    key: 'rule'
  },
  {
    title: '渲染样式',
    dataIndex: 'style',
    key: 'style'
  },
  {
    title: '级别设置',
    dataIndex: 'level'
  },
  {
    title: '缓存情况',
    dataIndex: 'cachestatus'
  },
  {
    title: '任务进度',
    dataIndex: 'precachestatus',
    key: 'precachestatus'
  },
  {
    title: '操作',
    align: 'center',
    width: 80,
    key: 'operation',
    fixed:'right'
  }
];
export { columns };
