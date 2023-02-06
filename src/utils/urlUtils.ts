import { Global } from 'xframelib';
import { useRouter,Router, LocationQueryRaw } from 'vue-router';

/**
 * 将对象添加当作参数拼接到URL上面
 * @param baseUrl 需要拼接的url
 * @param obj 参数对象
 * @returns {string} 拼接后的对象
 * 例子:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: object): string {
  let parameters = ''
  let url = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters
  }
  return url
}
/**
 * 新窗体打开URL
 * @param pathURL 相对路径
 * @param name  查询参数
 */
export function OpenNewURL(router:Router,pathURL:string,name:string)
{
  const url=router.resolve({
    path: pathURL,
    query: { name: name}
  });
  window.open(url.href,'_blank');
}

export function OpenURL(router:Router,pathURL:string,queryObj:LocationQueryRaw)
{
  const url=router.resolve({
    path: pathURL,
    query: queryObj
  });
  window.open(url.href,'_blank');
}
/**
 * 浏览图层的服务TileJson元数据
 * @param layerID 
 */
export function OpenServiceTileJson(layerID:string)
{
  const url=`${Global.Config.ServiceURL.WMTSService}/GetServiceBrowse?layer=${layerID}`;
  window.open(url,'_blank');
}
