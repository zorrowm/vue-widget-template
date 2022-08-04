import {Global,Handler } from 'xframelib';
import StatusEvent from './modules/StatusEvent';

/**
 * 监听事件
 * @param sysEvent 事件名称
 * @param eventHanlder 事件处理函数
 */
export function OnEventHandler(sysEvent: string, eventHanlder: Handler) {
  //console.log(sysEvent,eventHanlder,'OnEventHandler');
  Global.EventBus.on(sysEvent, eventHanlder);
}
/**
 *取消监听事件
 * @param sysEvent 事件名称
 * @param eventHanlder 事件处理函数
 */
export function OffEventHandler(sysEvent: string, eventHanlder: Handler) {
  //console.log(sysEvent,eventHanlder,'OffEventHandler');
  Global.EventBus.off(sysEvent, eventHanlder);
}
/**
 * 发送其他全局信息
 * @param sysEvent 事件类型
 * @param data 数据信息
 */
export function EmitMsg(sysEvent: string, data: any) {
  //console.log(sysEvent,data,'EmitMsg');
  Global.EventBus.emit(sysEvent, data);
}
/**
 * 发送状态栏的提示信息
 * @param data 状态信息
 */
export function EmitStatusMsg(data: string) {
  Global.EventBus.emit(StatusEvent.SatusMessage, data);
}
/**
 * 状态栏事件处理
 * @param eventHanlder
 */
export function OnStatusHandler(eventHanlder: Handler) {
  Global.EventBus.on(StatusEvent.SatusMessage, eventHanlder);
}
