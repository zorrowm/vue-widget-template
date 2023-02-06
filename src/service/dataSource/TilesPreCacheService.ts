import {GlobalHprose,ProxyClient} from 'xframelib'; 
/**
 *undefined 
 */
export class TilesPreCacheService {
    readonly hproseProxyClient: ProxyClient;
    constructor(hproseClient?: ProxyClient){
      if (hproseClient === undefined) this.hproseProxyClient = GlobalHprose.getDefaultClient();
      else this.hproseProxyClient = hproseClient;
    }
    
    /**
    *小级别瓦片缓存 
    *@param layer  @param cacheMaxLevel  @param xMin  @param yMin  @param xMax  @param yMax  @param IsRepair   
    *@returns Microsoft.AspNetCore.Mvc.IActionResult
    */
    async TilesPreCache( layer:string,cacheMaxLevel:number,xMin:number,yMin:number,xMax:number,yMax:number,IsRepair:boolean)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,TilesPreCache方法无法调用');
      }
      
      return await proxyClient?.TilesPreCache(layer,cacheMaxLevel,xMin,yMin,xMax,yMax,IsRepair);
    }

    /**
    *RepairTilesPreCache 
    *@param layer  @param cacheMaxLevel  @param xMin  @param yMin  @param xMax  @param yMax   
    *@returns Microsoft.AspNetCore.Mvc.IActionResult
    */
    async RepairTilesPreCache( layer:string,cacheMaxLevel:number,xMin:number,yMin:number,xMax:number,yMax:number)
    {
      const proxyClient=await this.hproseProxyClient.getHproseProxy();
      if(!proxyClient)
      {
        console.warn('ProxyClient为空,RepairTilesPreCache方法无法调用');
      }
      
      return await proxyClient?.RepairTilesPreCache(layer,cacheMaxLevel,xMin,yMin,xMax,yMax);
    }

}
export default new TilesPreCacheService();
