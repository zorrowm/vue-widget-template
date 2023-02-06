import { ProxyClient, Global } from 'xframelib';
const ServiceClients = {
  //数据集Client
  DatasetClient: new ProxyClient(Global.Config.ServiceURL.DatasetHproseAPI),
  //数据管理Client
  DataManageClient: new ProxyClient(Global.Config.ServiceURL.DataManageHproseAPI)
};

export default ServiceClients;
