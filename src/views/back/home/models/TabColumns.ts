import dayjs from  'dayjs';
const columns = [
  {
    title: "用户名",
    dataIndex: "Name",
    width: 100,
    fixed: "left",
  },
  {
    title: "真实姓名",
    dataIndex: "Realname",
    width: 150,
  },
  {
    title: "角色",
    ellipsis: "true",
    width: 300,
    key:'RoleUser'
  },
  {
    title: "锁定",
    align: "center",
    dataIndex: "Islocked",
    width: 80,
    key:"islocked"
  },
  {
    title: "创建人",
    width: 100,
    dataIndex: "CreateName",
  },
  {
    title: "创建时间",
    dataIndex: "Cjsj",
    width: 180,
    customCell: (record, rowIndex, column) => {
      const newTime = dayjs(record.Cjsj).format('YYYY-MM-DD HH:mm:ss');
      return {
        innerHTML: newTime
      };
    }
  },
  {
    title: "备注",
    dataIndex: "Remark",
  },
  {
    title: "操作",
    align: "center",
    fixed: "right",
    width: 125,
    key: 'operation'
  },
];
export { columns };
