import {GlobalHprose,ProxyClient} from 'xframelib'; 
/**
 *服务管理 
 */
export class ServiceInfoService {
    readonly hproseProxyClient: ProxyClient;
    constructor(hproseClient?: ProxyClient){
      if (hproseClient === undefined) this.hproseProxyClient = GlobalHprose.getDefaultClient();
      else this.hproseProxyClient = hproseClient;
    }
    
    /**
    *三维系统接口：获取所有服务(包括所有服务类型以及聚合服务)列表对象。注意：只查询经纬度、墨卡托坐标系的256瓦片，暂不考虑用户数据权限，服务都可见 
    *@param keyword  服务名可空@param PageIndex  当前页@param PageSize  每页个数 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetAllServicesfor3D( keyword:string,PageIndex:number,PageSize:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetAllServicesfor3D方法无法调用');
      }
      
      return await proxyClient?.GetAllServicesfor3D(keyword,PageIndex,PageSize);
    }

    /**
    *获取所有普通服务列表对象 
    *@param keyword  服务名可空@param PageIndex  当前页@param PageSize  每页个数@param sortname  @param sortway   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Serviceinfo]]
    */
    async GetAllServices( keyword:string,PageIndex:number,PageSize:number,sortname:string,sortway:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetAllServices方法无法调用');
      }
      
      return await proxyClient?.GetAllServices(keyword,PageIndex,PageSize,sortname,sortway);
    }

    /**
    *获取服务中不包含的项目数据 
    *@param dsname  项目名称@param servicename  服务名称@param PageIndex  第几页@param PageSize  每页数量（默认为10）@param keywords   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Datasetimage]]
    */
    async GetDatasetImageinfoByServiceNameAsync( dsname:string,servicename:string,PageIndex:number,PageSize:number,keywords:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetImageinfoByServiceNameAsync方法无法调用');
      }
      
      return await proxyClient?.GetDatasetImageinfoByServiceNameAsync(dsname,servicename,PageIndex,PageSize,keywords);
    }

    /**
    *获取数据集下的服务列表对象 
    *@param dataset  数据集名@param PageIndex  当前页@param PageSize  每页个数 
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Serviceinfo]]
    */
    async GetServicesListByDataset( dataset:string,PageIndex:number,PageSize:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicesListByDataset方法无法调用');
      }
      
      return await proxyClient?.GetServicesListByDataset(dataset,PageIndex,PageSize);
    }

    /**
    *创建服务 
    *@param serviceInfo  服务发布的配置ServiceInfo对象 
    *@returns System.Boolean
    */
    async AddService( serviceInfo?:Serviceinfo)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,AddService方法无法调用');
      }
      
      return await proxyClient?.AddService(serviceInfo);
    }

    /**
    *查询服务名称是否存在 
    *@param svname  服务名称 
    *@returns System.Boolean
    */
    async GetServiceNameIsExist( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServiceNameIsExist方法无法调用');
      }
      
      return await proxyClient?.GetServiceNameIsExist(svname);
    }

    /**
    *通过名称过滤获取服务列表 
    *@param serviceNameLike  名称模糊匹配 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[ImageBusinessDB.Models.Serviceinfo]]
    */
    async GetServicesByNamelikeAsync( serviceNameLike:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicesByNamelikeAsync方法无法调用');
      }
      
      return await proxyClient?.GetServicesByNamelikeAsync(serviceNameLike);
    }

    /**
    *查询服务对象信息 
    *@param serviceName  服务名称 
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.Serviceinfo]
    */
    async GetServiceInfoAsync( serviceName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServiceInfoAsync方法无法调用');
      }
      
      return await proxyClient?.GetServiceInfoAsync(serviceName);
    }

    /**
    *获取服务的Extent 
    *@param serviceName  服务名称 
    *@returns System.Threading.Tasks.Task`1[System.String]
    */
    async GetServiceExtentAsync( serviceName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServiceExtentAsync方法无法调用');
      }
      
      return await proxyClient?.GetServiceExtentAsync(serviceName);
    }

    /**
    *通过服务名获取相关数据 
    *@param serviceName  服务名称 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[ImageBusinessDB.Models.Servicereldata]]
    */
    async GetDataListByServiceAsync( serviceName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDataListByServiceAsync方法无法调用');
      }
      
      return await proxyClient?.GetDataListByServiceAsync(serviceName);
    }

    /**
    * 通过服务名获取相关数据 
    *@param serviceName  服务名称@param PageIndex  当前页@param PageSize  每页个数@param keywords   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Servicereldata]]
    */
    async GetDataListByServicePagingAsync( serviceName:string,PageIndex:number,PageSize:number,keywords:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDataListByServicePagingAsync方法无法调用');
      }
      
      return await proxyClient?.GetDataListByServicePagingAsync(serviceName,PageIndex,PageSize,keywords);
    }

    /**
    *获取当前相关影像 
    *@param serviceName  服务名称@param level  当前级别@param boundArr  坐标范围 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[ImageBusinessDB.Models.Servicereldata]]
    */
    async SearchRelateImagesAsync( serviceName:string,level:number,boundArr:number[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,SearchRelateImagesAsync方法无法调用');
      }
      
      return await proxyClient?.SearchRelateImagesAsync(serviceName,level,boundArr);
    }

    /**
    *更新服务信息 
    *@param serviceName  服务名称@param disname  服务字典参数@param minlevel  @param maxlevel  @param style   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateServiceAsync( serviceName:string,disname:string,minlevel:number,maxlevel:number,style:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateServiceAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateServiceAsync(serviceName,disname,minlevel,maxlevel,style);
    }

    /**
    *更新服务数据排序 
    *@param dindex  叠放顺序值@param serviceName  服务名称@param dataId  数据id 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateDindexAsync( dindex:number,serviceName:string,dataId:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateDindexAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateDindexAsync(dindex,serviceName,dataId);
    }

    /**
    *更新服务状态 
    *@param serviceName  服务名称@param enable  是否启用 
    *@returns System.Boolean
    */
    async UpdateServiceState( serviceName:string,enable:boolean)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateServiceState方法无法调用');
      }
      
      return await proxyClient?.UpdateServiceState(serviceName,enable);
    }

    /**
    *删除服务 
    *@param servicename  服务名称 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteServiceAsync( servicename:string[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteServiceAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteServiceAsync(servicename);
    }

    /**
    *根据服务名称获取相同切片方案的服务列表(不分页) 
    *@param svname  服务名称 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[ImageBusinessDB.Models.Serviceinfo]]
    */
    async GetServiceinfoByRuleAsync( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServiceinfoByRuleAsync方法无法调用');
      }
      
      return await proxyClient?.GetServiceinfoByRuleAsync(svname);
    }

    /**
    *浏览所需信息 
    *@param name  名称@param prefix  类型前缀@param dsName   
    *@returns System.Threading.Tasks.Task`1[ImageAdminService.Model.BrowseVM]
    */
    async GetServiceBrowseAsync( name:string,prefix:string,dsName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServiceBrowseAsync方法无法调用');
      }
      
      return await proxyClient?.GetServiceBrowseAsync(name,prefix,dsName);
    }

    /**
    *获取该服务的元数据 
    *@param url  服务名称@param servicename   
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetServicemetadataAsync( url:string,servicename:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicemetadataAsync方法无法调用');
      }
      
      return await proxyClient?.GetServicemetadataAsync(url,servicename);
    }

    /**
    *获取该服务的元数据(返回字符串) 
    *@param url  @param servicename   
    *@returns System.Threading.Tasks.Task`1[System.String]
    */
    async GetServicemetadataToStringAsync( url:string,servicename:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicemetadataToStringAsync方法无法调用');
      }
      
      return await proxyClient?.GetServicemetadataToStringAsync(url,servicename);
    }

    /**
    *编辑服务元数据 
    *@param servicemetadata   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateServicemetadataAsync( servicemetadata?:Servicemetadata)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateServicemetadataAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateServicemetadataAsync(servicemetadata);
    }

    /**
    *获取服务元数据信息（坐标范围、数据大小波段等） 
    *@param servicename  服务名称 
    *@returns ImageAdminService.Model.Servicemetainfo
    */
    async GetServicemetadataAsync1( servicename:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicemetadataAsync1方法无法调用');
      }
      
      return await proxyClient?.GetServicemetadataAsync1(servicename);
    }

    /**
    *服务索引重建 
    *@param serviceName  @param dataid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async ReconstructionServiceIndexAsync( serviceName:string,dataid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,ReconstructionServiceIndexAsync方法无法调用');
      }
      
      return await proxyClient?.ReconstructionServiceIndexAsync(serviceName,dataid);
    }

    /**
    *服务缩略图重建 
    *@param serviceName  服务名称@param dataid  是否覆盖已存在的(默认是true)@param forceUpdate  @param xMin  @param yMin  @param xMax  @param yMax   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async ReconstructionServiceThumb( serviceName:string,dataid:string,forceUpdate:boolean,xMin:number,yMin:number,xMax:number,yMax:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,ReconstructionServiceThumb方法无法调用');
      }
      
      return await proxyClient?.ReconstructionServiceThumb(serviceName,dataid,forceUpdate,xMin,yMin,xMax,yMax);
    }

    /**
    *删除服务中的影像 
    *@param service  @param imgids   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteServiceImageinfoAsync( service:string,imgids:string[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteServiceImageinfoAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteServiceImageinfoAsync(service,imgids);
    }

    /**
    *获取URL链接地址 
    *@param url  ip和端口@param prj  类型(数据集,服务等)@param name  名称@param imgid  影像的ID@param level  级别 默认为10级 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetTilesUrlByType( url:string,prj:string,name:string,imgid:string,level:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTilesUrlByType方法无法调用');
      }
      
      return await proxyClient?.GetTilesUrlByType(url,prj,name,imgid,level);
    }

    /**
    *获取URL链接地址(返回字符串) 
    *@param url  ip和端口@param prj  类型(数据集,服务等)@param name  名称@param imgid  影像的ID@param level  级别 默认为10级 
    *@returns System.Threading.Tasks.Task`1[System.String]
    */
    async GetTilesUrlByTypeToString( url:string,prj:string,name:string,imgid:string,level:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTilesUrlByTypeToString方法无法调用');
      }
      
      return await proxyClient?.GetTilesUrlByTypeToString(url,prj,name,imgid,level);
    }

    /**
    *清除服务的Redis和Mongo 缓存 
    *@param service   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeletServiceRedisCacheAsync( service:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeletServiceRedisCacheAsync方法无法调用');
      }
      
      return await proxyClient?.DeletServiceRedisCacheAsync(service);
    }

    /**
    *获取服务波段值 
    *@param svname   
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[ImageBusinessDB.Models.Serviceband]]
    */
    async GetServicebandListByNameAsync( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicebandListByNameAsync方法无法调用');
      }
      
      return await proxyClient?.GetServicebandListByNameAsync(svname);
    }

    /**
    *编辑地形服务波段统计 
    *@param servicebands  服务名称 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateAsyncServicerBandAsync( servicebands:any[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateAsyncServicerBandAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateAsyncServicerBandAsync(servicebands);
    }

    /**
    *获取地形服务地形管理 
    *@param svname  服务名称 
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.Servicehillshade]
    */
    async GetServicerHillshadeAsync( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetServicerHillshadeAsync方法无法调用');
      }
      
      return await proxyClient?.GetServicerHillshadeAsync(svname);
    }

    /**
    *编辑地形服务地形管理 
    *@param servicehillshade  服务地形管理对象 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateServicerHillshadeAsync( servicehillshade?:Servicehillshade)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateServicerHillshadeAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateServicerHillshadeAsync(servicehillshade);
    }

    /**
    *内部测试添加服务(随后会删除),服务名称 
    *@param dsname  @param serviceName  @param rule   
    *@returns System.Boolean
    */
    async TestAddServiceInfo( dsname:string,serviceName:string,rule:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestAddServiceInfo方法无法调用');
      }
      
      return await proxyClient?.TestAddServiceInfo(dsname,serviceName,rule);
    }

    /**
    *内部测试添加服务缩略图 单个(随后会删除),服务名称 
    *@param svname  @param imgid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestThumbnailCreateAsync( svname:string,imgid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestThumbnailCreateAsync方法无法调用');
      }
      
      return await proxyClient?.TestThumbnailCreateAsync(svname,imgid);
    }

    /**
    *内部测试添加服务缩略图 批量(随后会删除),服务名称 
    *@param svname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestThumbnailCreateListAsync( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestThumbnailCreateListAsync方法无法调用');
      }
      
      return await proxyClient?.TestThumbnailCreateListAsync(svname);
    }

    /**
    *内部测试添加服务缩略图索引 单个(随后会删除),服务名称 
    *@param imageid  @param svname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestThumbnailIndex( imageid:string,svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestThumbnailIndex方法无法调用');
      }
      
      return await proxyClient?.TestThumbnailIndex(imageid,svname);
    }

    /**
    *内部测试添加服务索引 单个(随后会删除),服务名称 
    *@param imageid  @param svname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestServiceIndex( imageid:string,svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestServiceIndex方法无法调用');
      }
      
      return await proxyClient?.TestServiceIndex(imageid,svname);
    }

    /**
    *内部测试添加服务索引 和缩略图索引(随后会删除),服务名称 
    *@param svname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestIndexAddThumbnailIndex( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestIndexAddThumbnailIndex方法无法调用');
      }
      
      return await proxyClient?.TestIndexAddThumbnailIndex(svname);
    }

    /**
    *单个服务删除 
    *@param name  @param name2   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteServiceInfoAsync( name:string,name2:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteServiceInfoAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteServiceInfoAsync(name,name2);
    }

    /**
    *内部测试,删除服务中的数据 
    *@param svname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestDeleteServicereldata( svname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteServicereldata方法无法调用');
      }
      
      return await proxyClient?.TestDeleteServicereldata(svname);
    }

    /**
    *内部测试,增加地形服务地形管理 
    * 
    *@returns System.Boolean
    */
    async TestInsertServiceHillshade( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestInsertServiceHillshade方法无法调用');
      }
      
      return await proxyClient?.TestInsertServiceHillshade();
    }

    /**
    *undefined 
    * 
    *@returns System.Void
    */
    async TestGCException( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestGCException方法无法调用');
      }
      
      return await proxyClient?.TestGCException();
    }

}
export default new ServiceInfoService();
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
export interface Servicemetadata{
id:string,
service:string,
title:string,
abstract:string,
keywords:string,
serviceType:string,
serviceTypeVersion:string,
fees:string,
accessConstraints:string,
providerName:string,
providerSite:string,
individualName:string,
positionName:string,
contactPhoneVoice:string,
contactPhoneFacsimile:string,
contactAddressDeliveryPoint:string,
multiDate?:any
}
export interface Servicehillshade{
id:string,
service:string,
usehillshade?:number,
azimuth?:number,
altitude?:number,
elevationcoefficient?:number,
transparency?:number,
resampling?:number,
extendfield1:string,
extendfield2:string,
serviceNavigation:any
}
