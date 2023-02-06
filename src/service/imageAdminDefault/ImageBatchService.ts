import {GlobalHprose,ProxyClient} from 'xframelib'; 
/**
 *服务批量加数据 
 */
export class ImageBatchService {
    readonly hproseProxyClient: ProxyClient;
    constructor(hproseClient?: ProxyClient){
      if (hproseClient === undefined) this.hproseProxyClient = GlobalHprose.getDefaultClient();
      else this.hproseProxyClient = hproseClient;
    }
    
    /**
    *发布项目所有数据为服务 
    *@param datasetName  项目名称;服务对象@param serviceInfo   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async PublishService( datasetName:string,serviceInfo?:Serviceinfo)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,PublishService方法无法调用');
      }
      
      return await proxyClient?.PublishService(datasetName,serviceInfo);
    }

    /**
    *添加服务数据 
    *@param serviceName  服务名称@param datasetDataList  数据列表（ID@param isFull  名称 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async AddServiceDataAsync( serviceName:string,datasetDataList:any[],isFull:boolean)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,AddServiceDataAsync方法无法调用');
      }
      
      return await proxyClient?.AddServiceDataAsync(serviceName,datasetDataList,isFull);
    }

    /**
    *服务复制 
    *@param servicename  @param serviceinfo   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async ServiceinfoCopyAsync( servicename:string,serviceinfo:Serviceinfo)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,ServiceinfoCopyAsync方法无法调用');
      }
      
      return await proxyClient?.ServiceinfoCopyAsync(servicename,serviceinfo);
    }

    /**
    *内部测试服务添加数据(随后会删除),服务名称 
    *@param dsname  @param serviceName  @param imageid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async Testadd( dsname:string,serviceName:string,imageid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,Testadd方法无法调用');
      }
      
      return await proxyClient?.Testadd(dsname,serviceName,imageid);
    }

    /**
    *测试查询失败的id 
    *@param svname   
    *@returns System.Void
    */
    async TaskErrorCerateIndex( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TaskErrorCerateIndex方法无法调用');
      }
      
      return await proxyClient?.TaskErrorCerateIndex(svname);
    }

    /**
    *测试数据集发布成服务 
    *@param dsname  @param service   
    *@returns System.Threading.Tasks.Task
    */
    async TestDatasetPublishService( dsname:string,service:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDatasetPublishService方法无法调用');
      }
      
      return await proxyClient?.TestDatasetPublishService(dsname,service);
    }

    /**
    *测试批量添加 
    *@param dataset  @param service  @param dataid   
    *@returns System.Threading.Tasks.Task
    */
    async TestServiceAddData( dataset:string,service:string,dataid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestServiceAddData方法无法调用');
      }
      
      return await proxyClient?.TestServiceAddData(dataset,service,dataid);
    }

    /**
    *测试服务复制的方法 
    *@param svname  @param copyname   
    *@returns System.Threading.Tasks.Task
    */
    async TestServiceinfoCopy( svname:string,copyname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestServiceinfoCopy方法无法调用');
      }
      
      return await proxyClient?.TestServiceinfoCopy(svname,copyname);
    }

    /**
    *测试分批获取缩略图索引 
    *@param name   
    *@returns System.Threading.Tasks.Task
    */
    async TestGetThumbIndexAsync( name:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestGetThumbIndexAsync方法无法调用');
      }
      
      return await proxyClient?.TestGetThumbIndexAsync(name);
    }

}
export default new ImageBatchService();
export interface Serviceinfo{
name:string,
dataset:string,
style:string,
rule:string,
aliasname:string,
coordinatesystem:string,
tag:string,
minlevel:number,
maxlevel:number,
browsecache:number,
bcacheminlevel:number,
bcachemaxlevel:number,
precache:number,
precachelevel:number,
precachestatus:number,
remark:string,
enable:number,
xminv:number,
xmaxv:number,
yminv:number,
ymaxv:number,
createtime?:any,
createuser:string,
updatetime?:any,
updateuser:string,
isgeographic:number,
type:number,
countdata:number,
status:number,
stateName:number[],
datasetNavigation:any,
ruleNavigation:any,
styleNavigation:any,
serviceband:any[],
servicehillshade:any[],
grouprelservice:any[],
multirelservice:any[],
servicereldata:any[]
}
