/**
 * 传递的WindowPanel数据模型
 */
export interface IPanelData
{
  id:string;//唯一窗体标识
  icon?:string;//窗体图标
  title?:string;//窗体标题
  pid?:string;//WidgetID
  data?:any;//所带数据
}

/**
 * Windows窗体Map集合
 */
export const WindowsMap=new Map<string,IPanelData>();

/**
 * 注册添加窗体对象
 * @param panelData
 */
export function addWindowPanel(panelData:IPanelData)
{
   //加入字典集合
   WindowsMap.set(panelData.id,panelData);
}
/**
 * 移除窗体
 * @param id
 */
export function removeWindowPanel(id:string)
{
  if(WindowsMap.has(id))
    WindowsMap.delete(id);
}

