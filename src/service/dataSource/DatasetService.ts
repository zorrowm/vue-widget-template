import {GlobalHprose,ProxyClient} from 'xframelib'; 
/**
 *数据集服务 
 */
export class DatasetService {
    readonly hproseProxyClient: ProxyClient;
    constructor(hproseClient?: ProxyClient){
      if (hproseClient === undefined) this.hproseProxyClient = GlobalHprose.getDefaultClient();
      else this.hproseProxyClient = hproseClient;
    }
    
    /**
    *任务推送测试 
    *@param content   
    *@returns System.Boolean
    */
    async TestWorkMessage( content:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestWorkMessage方法无法调用');
      }
      
      return await proxyClient?.TestWorkMessage(content);
    }

    /**
    *数据集单个索引删除 
    *@param dataset  @param imageid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async TestDeleteDatasetIndexAsync( dataset:string,imageid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteDatasetIndexAsync方法无法调用');
      }
      
      return await proxyClient?.TestDeleteDatasetIndexAsync(dataset,imageid);
    }

    /**
    *调整geom错的地方 
    *@param imageid  @param path   
    *@returns System.Int32
    */
    async TestImageinfoGeom( imageid:string,path:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestImageinfoGeom方法无法调用');
      }
      
      return await proxyClient?.TestImageinfoGeom(imageid,path);
    }

    /**
    *测试消息推送 
    *@param type  @param dsName   
    *@returns System.Threading.Tasks.Task
    */
    async TestManageSend( type:number,dsName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestManageSend方法无法调用');
      }
      
      return await proxyClient?.TestManageSend(type,dsName);
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
    *内部测试修改数据集元数据信息 
    * 
    *@returns System.Void
    */
    async TestUpdateServicemetadataAsync( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestUpdateServicemetadataAsync方法无法调用');
      }
      
      return await proxyClient?.TestUpdateServicemetadataAsync();
    }

    /**
    *获取数据集 集合 
    *@param keyword  关键字(可为空)@param PageIndex  页数@param PageSize  每页条数@param state  查询状态个人还是用户组的(为0 则表示全部)@param sortname  @param sortway   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Dataset]]
    */
    async GetDatasetListAsync( keyword:string,PageIndex:number,PageSize:number,state:number,sortname:string,sortway:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetListAsync方法无法调用');
      }
      
      return await proxyClient?.GetDatasetListAsync(keyword,PageIndex,PageSize,state,sortname,sortway);
    }

    /**
    *获取全部项目名称列表 
    *@param type  类别（普通 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[System.String]]
    */
    async GetProgramListAllAsync( type:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetProgramListAllAsync方法无法调用');
      }
      
      return await proxyClient?.GetProgramListAllAsync(type);
    }

    /**
    *获取单个数据集 
    *@param name  数据集名称 
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.Dataset]
    */
    async GetDatasetInfoAsync( name:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetInfoAsync方法无法调用');
      }
      
      return await proxyClient?.GetDatasetInfoAsync(name);
    }

    /**
    *添加数据集信息 
    *@param dataset  数据集对象 
    *@returns System.Boolean
    */
    async SaveDataset( dataset?:Dataset)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,SaveDataset方法无法调用');
      }
      
      return await proxyClient?.SaveDataset(dataset);
    }

    /**
    *数据集椭球选择 
    *@param keyword  @param pageindex  @param pagesize   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.GdalDatum]]
    */
    async GetGDALDatumListAsync( keyword:string,pageindex:number,pagesize:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetGDALDatumListAsync方法无法调用');
      }
      
      return await proxyClient?.GetGDALDatumListAsync(keyword,pageindex,pagesize);
    }

    /**
    *获取单个椭球信息 
    *@param name   
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.GdalDatum]
    */
    async GetGDALDatumInfoAsync( name:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetGDALDatumInfoAsync方法无法调用');
      }
      
      return await proxyClient?.GetGDALDatumInfoAsync(name);
    }

    /**
    *获取数据集样式id 
    * 
    *@returns System.Collections.Generic.List`1[System.String]
    */
    async GetDatasetTypeId( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetTypeId方法无法调用');
      }
      
      return await proxyClient?.GetDatasetTypeId();
    }

    /**
    *数据集名称是否存在 
    *@param dsname   
    *@returns System.Boolean
    */
    async GetDatasetNameIsExist( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetNameIsExist方法无法调用');
      }
      
      return await proxyClient?.GetDatasetNameIsExist(dsname);
    }

    /**
    *获取操作系统及当前系统驱动盘 
    *@param path   
    *@returns System.Collections.Generic.List`1[System.String]
    */
    async GetSystemOSAndDisc( path:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetSystemOSAndDisc方法无法调用');
      }
      
      return await proxyClient?.GetSystemOSAndDisc(path);
    }

    /**
    *获取文件目录树(0：获取文件，1：获取文件夹) 
    *@param directoryfile  获取目录树字段值@param path  路径@param pageIndex  @param pageSize  @param listFilter   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[DataSourceService.Services.Model.TreeNodePath]]
    */
    async getCatalogTree( directoryfile:string,path:string,pageIndex:number,pageSize:number,listFilter:any[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,getCatalogTree方法无法调用');
      }
      
      return await proxyClient?.getCatalogTree(directoryfile,path,pageIndex,pageSize,listFilter);
    }

    /**
    *获取默认目录路径 
    * 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.List`1[System.String]]
    */
    async getDefault( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,getDefault方法无法调用');
      }
      
      return await proxyClient?.getDefault();
    }

    /**
    *获取影像的椭球 
    *@param path  路径名 
    *@returns System.String
    */
    async GetImageinfoDatum( path:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImageinfoDatum方法无法调用');
      }
      
      return await proxyClient?.GetImageinfoDatum(path);
    }

    /**
    *编辑数据集信息 
    *@param dsname  数据集名称@param Displayname  别名@param styleid  样式id@param remark  备注 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateDatasetAsync( dsname:string,Displayname:string,styleid:string,remark:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateDatasetAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateDatasetAsync(dsname,Displayname,styleid,remark);
    }

    /**
    *删除数据集 
    *@param names  数据集名称集合 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteDataSetListAsync( names:string[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteDataSetListAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteDataSetListAsync(names);
    }

    /**
    *获取预缓存瓦片数量 
    *@param layer  @param cacheMaxLevel  @param xMin  @param yMin  @param xMax  @param yMax   
    *@returns System.Threading.Tasks.Task`1[System.Int32]
    */
    async GetTilesPreCacheCountByLevelAsync( layer:string,cacheMaxLevel:number,xMin:number,yMin:number,xMax:number,yMax:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTilesPreCacheCountByLevelAsync方法无法调用');
      }
      
      return await proxyClient?.GetTilesPreCacheCountByLevelAsync(layer,cacheMaxLevel,xMin,yMin,xMax,yMax);
    }

    /**
    *获取预缓存瓦片数量2 
    *@param Rule  @param minLevel  @param cacheMaxLevel  @param xMin  @param yMin  @param xMax  @param yMax   
    *@returns System.Threading.Tasks.Task`1[System.Int32]
    */
    async GetTilesPreCacheCountByLevelAsync2( Rule:string,minLevel:number,cacheMaxLevel:number,xMin:number,yMin:number,xMax:number,yMax:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTilesPreCacheCountByLevelAsync2方法无法调用');
      }
      
      return await proxyClient?.GetTilesPreCacheCountByLevelAsync2(Rule,minLevel,cacheMaxLevel,xMin,yMin,xMax,yMax);
    }

    /**
    *获取数据集元数据(四至范围数据元数据等信息) 
    *@param datasetName  数据集名称 
    *@returns System.Threading.Tasks.Task`1[DataSourceService.Model.DatasetInfo]
    */
    async GetDatasetmetadataAsync( datasetName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetmetadataAsync方法无法调用');
      }
      
      return await proxyClient?.GetDatasetmetadataAsync(datasetName);
    }

    /**
    *获取数据集信息(datasetcapabilities) 
    *@param url  数据集名称@param datasetName   
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetDatasetmetadataAsync1( url:string,datasetName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetmetadataAsync1方法无法调用');
      }
      
      return await proxyClient?.GetDatasetmetadataAsync1(url,datasetName);
    }

    /**
    *编辑数据集capabilities信息 
    *@param datasetcapabilities   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateServicemetadataAsync( datasetcapabilities?:Datasetcapabilities)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateServicemetadataAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateServicemetadataAsync(datasetcapabilities);
    }

    /**
    *数据集建立索引 
    *@param name  @param dataid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DatasetBuildImageIndexAsync( name:string,dataid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DatasetBuildImageIndexAsync方法无法调用');
      }
      
      return await proxyClient?.DatasetBuildImageIndexAsync(name,dataid);
    }

    /**
    *数据集快视图构建 
    *@param name  数据集名称@param forceUpdate  是否强制，默认是强制更新@param xMin  最小x@param yMin  最小y@param xMax  最大x@param yMax  最大y 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DatasetBuildThumbIndexAsync( name:string,forceUpdate:boolean,xMin:number,yMin:number,xMax:number,yMax:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DatasetBuildThumbIndexAsync方法无法调用');
      }
      
      return await proxyClient?.DatasetBuildThumbIndexAsync(name,forceUpdate,xMin,yMin,xMax,yMax);
    }

    /**
    *数据集删除索引 
    *@param dsname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteDatasetIndexAsync( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteDatasetIndexAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteDatasetIndexAsync(dsname);
    }

    /**
    *清理数据集缓存 
    *@param dsname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteCache( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteCache方法无法调用');
      }
      
      return await proxyClient?.DeleteCache(dsname);
    }

    /**
    *数据集设置是否监控 
    *@param name  数据集名称@param iswatch  是否监控 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DatasetSetWatcherAsync( name:string,iswatch:boolean)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DatasetSetWatcherAsync方法无法调用');
      }
      
      return await proxyClient?.DatasetSetWatcherAsync(name,iswatch);
    }

    /**
    *保存影像数据 
    *@param datastName  项目名@param imgName  影像名@param imgPath  影像路径2@param code   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async SaveImageDataAsync( datastName:string,imgName:string,imgPath:string,code:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,SaveImageDataAsync方法无法调用');
      }
      
      return await proxyClient?.SaveImageDataAsync(datastName,imgName,imgPath,code);
    }

    /**
    *保存影像数据 
    *@param datastName  项目名@param imgId  影像名@param code  影像路径2 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async SaveImageDataByFileAsync( datastName:string,imgId:string,code:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,SaveImageDataByFileAsync方法无法调用');
      }
      
      return await proxyClient?.SaveImageDataByFileAsync(datastName,imgId,code);
    }

    /**
    *获取路径下的所有影像数量 
    *@param path  @param listFileFilter   
    *@returns System.Threading.Tasks.Task`1[System.Int32]
    */
    async GetTifCountByPath( path:string,listFileFilter:any[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTifCountByPath方法无法调用');
      }
      
      return await proxyClient?.GetTifCountByPath(path,listFileFilter);
    }

    /**
    *获取地形数据集地形管理 
    *@param dsname  数据集名称 
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.Datasethillshade]
    */
    async GetDatasetHillshadeAsync( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetDatasetHillshadeAsync方法无法调用');
      }
      
      return await proxyClient?.GetDatasetHillshadeAsync(dsname);
    }

    /**
    *编辑地形数据集地形管理 
    *@param datasethillshade  数据集地形管理对象 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateDatasetHillshadeAsync( datasethillshade?:Datasethillshade)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateDatasetHillshadeAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateDatasetHillshadeAsync(datasethillshade);
    }

    /**
    *获取数据集的数据列表 
    *@param dataset  数据集名称(可为空)@param keyword  关键字(可为空)@param PageIndex  页数@param PageSize  每页条数@param order   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Datasetimage]]
    */
    async GetImageListByDataset( dataset:string,keyword:string,PageIndex:number,PageSize:number,order:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImageListByDataset方法无法调用');
      }
      
      return await proxyClient?.GetImageListByDataset(dataset,keyword,PageIndex,PageSize,order);
    }

    /**
    *undefined 
    *@param dataset  @param keyword  @param PageIndex  @param PageSize   
    *@returns System.Threading.Tasks.Task`1[XFrame.Core.Utils.PagedList`1[ImageBusinessDB.Models.Imageinfo]]
    */
    async GetImageInfoListByDataset( dataset:string,keyword:string,PageIndex:number,PageSize:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImageInfoListByDataset方法无法调用');
      }
      
      return await proxyClient?.GetImageInfoListByDataset(dataset,keyword,PageIndex,PageSize);
    }

    /**
    *删除数据集中的数据 
    *@param dsname  数据集名称@param ids  ID集合 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteDatasetImageInfoAsync( dsname:string,ids:string[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteDatasetImageInfoAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteDatasetImageInfoAsync(dsname,ids);
    }

    /**
    *获取单个影像数据信息 
    *@param imgID  影像数据ID 
    *@returns System.Threading.Tasks.Task`1[ImageBusinessDB.Models.Imageinfo]
    */
    async GetImageinfoAsync( imgID:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImageinfoAsync方法无法调用');
      }
      
      return await proxyClient?.GetImageinfoAsync(imgID);
    }

    /**
    *删除单个影像信息(根据影像进行删除,) 
    *@param dataIDList   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteImageinfoAsync( dataIDList:string[])
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteImageinfoAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteImageinfoAsync(dataIDList);
    }

    /**
    *根据影像ID进行重建金字塔和快视图WC 
    *@param imageid  影像ID 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateImageOverviewThumbAsync( imageid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateImageOverviewThumbAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateImageOverviewThumbAsync(imageid);
    }

    /**
    *获取单个影像的元数据信息 
    *@param imgID   
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetImagemetadataAsync( imgID:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImagemetadataAsync方法无法调用');
      }
      
      return await proxyClient?.GetImagemetadataAsync(imgID);
    }

    /**
    *获取单个影像的元数据信息(返回字符串) 
    *@param imgID   
    *@returns System.Threading.Tasks.Task`1[System.String]
    */
    async GetImagemetadataToStringAsync( imgID:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetImagemetadataToStringAsync方法无法调用');
      }
      
      return await proxyClient?.GetImagemetadataToStringAsync(imgID);
    }

    /**
    *单个影像重建索引 
    *@param imageid  @param dsname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async ReconstructionImageIndexAsync( imageid:string,dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,ReconstructionImageIndexAsync方法无法调用');
      }
      
      return await proxyClient?.ReconstructionImageIndexAsync(imageid,dsname);
    }

    /**
    *单个影像重建快视图索引 
    *@param imageid  @param dsname   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async ReconstructionImageThumbAsync( imageid:string,dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,ReconstructionImageThumbAsync方法无法调用');
      }
      
      return await proxyClient?.ReconstructionImageThumbAsync(imageid,dsname);
    }

    /**
    *更新影像对比色差 
    *@param imgid  影像ID@param percentToBalance  色差比例 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateImagePercentAsync( imgid:string,percentToBalance:any)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateImagePercentAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateImagePercentAsync(imgid,percentToBalance);
    }

    /**
    *更新影像RGB顺序 
    *@param imgid  影像ID@param newBandOrder  新色带顺序 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateImageBandOrderAsync( imgid:string,newBandOrder:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateImageBandOrderAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateImageBandOrderAsync(imgid,newBandOrder);
    }

    /**
    *更新数据集数据排序 
    *@param dindex  叠放顺序值@param dsName  数据集名称@param dataId  数据id 
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async UpdateDindexAsync( dindex:number,dsName:string,dataId:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,UpdateDindexAsync方法无法调用');
      }
      
      return await proxyClient?.UpdateDindexAsync(dindex,dsName,dataId);
    }

    /**
    *删除单个数据的缓存 
    *@param dsName  @param imageid   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async DeleteImageRedisAsync( dsName:string,imageid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,DeleteImageRedisAsync方法无法调用');
      }
      
      return await proxyClient?.DeleteImageRedisAsync(dsName,imageid);
    }

    /**
    *根据范围获取时相列表 
    *@param layerName  图层名称@param prj  坐标系@param xMin  最小经度@param yMin  最小纬度@param xMax  最大经度@param yMax  最大纬度@param level  级别 
    *@returns System.Threading.Tasks.Task`1[System.Collections.Generic.Dictionary`2[System.String,System.Object]]
    */
    async GetTimeListbyExtentAsync( layerName:string,prj:string,xMin:number,yMin:number,xMax:number,yMax:number,level:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,GetTimeListbyExtentAsync方法无法调用');
      }
      
      return await proxyClient?.GetTimeListbyExtentAsync(layerName,prj,xMin,yMin,xMax,yMax,level);
    }

    /**
    *编辑数据时相信息 
    *@param imgID  @param shootingdate   
    *@returns System.Threading.Tasks.Task`1[System.Boolean]
    */
    async updateImageinfoDateAsync( imgID:string,shootingdate:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,updateImageinfoDateAsync方法无法调用');
      }
      
      return await proxyClient?.updateImageinfoDateAsync(imgID,shootingdate);
    }

    /**
    *内部测试获取时相范围 
    * 
    *@returns System.Void
    */
    async TestGetTimeListbyExtentAsync( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestGetTimeListbyExtentAsync方法无法调用');
      }
      
      return await proxyClient?.TestGetTimeListbyExtentAsync();
    }

    /**
    *内部修改影像时相信息测试 
    * 
    *@returns System.Void
    */
    async TestupdateImageinfoDateAsync( )
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestupdateImageinfoDateAsync方法无法调用');
      }
      
      return await proxyClient?.TestupdateImageinfoDateAsync();
    }

    /**
    *内部添加数据集信息测试,之后要删除的 
    *@param dsname   
    *@returns System.Void
    */
    async TestSaveDatasetinfo( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestSaveDatasetinfo方法无法调用');
      }
      
      return await proxyClient?.TestSaveDatasetinfo(dsname);
    }

    /**
    *内部删除测试,之后要删除的 
    *@param dsnaem   
    *@returns System.Threading.Tasks.Task
    */
    async TestDeletTestAsync( dsnaem:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeletTestAsync方法无法调用');
      }
      
      return await proxyClient?.TestDeletTestAsync(dsnaem);
    }

    /**
    *内部快视图索引创建测试,之后要删除的 
    *@param dsname  @param imgid   
    *@returns System.Threading.Tasks.Task
    */
    async TestCreateThumbnailIndexAsync( dsname:string,imgid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestCreateThumbnailIndexAsync方法无法调用');
      }
      
      return await proxyClient?.TestCreateThumbnailIndexAsync(dsname,imgid);
    }

    /**
    *内部快视图创建测试,之后要删除的 
    *@param dsname   
    *@returns System.Threading.Tasks.Task
    */
    async TestCreateThumbnailListAsync( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestCreateThumbnailListAsync方法无法调用');
      }
      
      return await proxyClient?.TestCreateThumbnailListAsync(dsname);
    }

    /**
    *内部快视图创建测试单个,之后要删除的 
    *@param dsname  @param id   
    *@returns System.Threading.Tasks.Task
    */
    async TestCreateThumbnailAsync( dsname:string,id:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestCreateThumbnailAsync方法无法调用');
      }
      
      return await proxyClient?.TestCreateThumbnailAsync(dsname,id);
    }

    /**
    *内部数据集单个影像删除,之后要删除的 
    *@param dsname  @param id   
    *@returns System.Threading.Tasks.Task
    */
    async TestDeleteDatasetByIDAsync( dsname:string,id:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteDatasetByIDAsync方法无法调用');
      }
      
      return await proxyClient?.TestDeleteDatasetByIDAsync(dsname,id);
    }

    /**
    *内部数据集影像删除四至以及波段数据的调整,之后要删除的 
    *@param dsname  @param imgid   
    *@returns System.Threading.Tasks.Task
    */
    async TeskDatasetBandDelete( dsname:string,imgid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TeskDatasetBandDelete方法无法调用');
      }
      
      return await proxyClient?.TeskDatasetBandDelete(dsname,imgid);
    }

    /**
    *内部数据集添加数据时自定义epsg,之后要删除的 
    *@param epsg  @param geoepsg   
    *@returns System.Void
    */
    async TeskImageTileruleCreate( epsg:string,geoepsg:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TeskImageTileruleCreate方法无法调用');
      }
      
      return await proxyClient?.TeskImageTileruleCreate(epsg,geoepsg);
    }

    /**
    *内部数据集删除数据服务,之后要删除的 
    *@param dsname  @param imageid   
    *@returns System.Threading.Tasks.Task
    */
    async TestDeleteDatasetimageinfoAsync( dsname:string,imageid:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteDatasetimageinfoAsync方法无法调用');
      }
      
      return await proxyClient?.TestDeleteDatasetimageinfoAsync(dsname,imageid);
    }

    /**
    *内部redis调用清除缓存,之后要删除的 
    *@param layer   
    *@returns System.Threading.Tasks.Task
    */
    async TestDeleteRedisCacheAsync( layer:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteRedisCacheAsync方法无法调用');
      }
      
      return await proxyClient?.TestDeleteRedisCacheAsync(layer);
    }

    /**
    *内部更新数据集四至,之后要删除的 
    *@param dsName   
    *@returns System.Threading.Tasks.Task
    */
    async TestUpdateDatasetmetdata( dsName:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestUpdateDatasetmetdata方法无法调用');
      }
      
      return await proxyClient?.TestUpdateDatasetmetdata(dsName);
    }

    /**
    *删除数据集 
    *@param dsname   
    *@returns System.Threading.Tasks.Task
    */
    async TestDeleteDatasetInfo( dsname:string)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TestDeleteDatasetInfo方法无法调用');
      }
      
      return await proxyClient?.TestDeleteDatasetInfo(dsname);
    }

}
export default new DatasetService();
export interface Dataset{
name:string,
displayname:string,
style:string,
rule:string,
type:number,
datum:string,
path:string,
remark:string,
enable:number,
status:number,
progress:string,
createtime?:any,
createuser:string,
updatetime?:any,
updateuser:string,
hasoverview?:number,
userGroups:string,
browsecache:number,
bcacheminlevel:number,
bcachemaxlevel:number,
precache:number,
precachelevel:number,
minlevel?:number,
maxlevel?:number,
ispixelstatistics?:number,
isWatch:boolean,
dataCount:number,
stateName:number[],
ruleNavigation:any,
styleNavigation:any,
apptagdataset:any[],
datasetband:any[],
datasetfilter:any[],
datasetgroup:any[],
datasethillshade:any[],
datasetimage:any[],
datasetmetadata:any[],
datasetoverview:any[],
dynamicservice:any[],
imagephase:any[],
multiservicedataset:any[],
serviceinfo:any[],
servicereldata:any[],
groupreldataset:any[]
}
export interface Datasetcapabilities{
id:string,
dataset:string,
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
export interface Datasethillshade{
id:string,
dataset:string,
usehillshade?:number,
azimuth?:number,
altitude?:number,
elevationcoefficient?:number,
transparency?:number,
resampling?:number,
extendfield1:string,
extendfield2:string,
datasetNavigation:any
}
