import { EmitMsg } from "@/events";
import WidgetsEvent from "@/events/modules/WidgetsEvent";
import { IModalEventData } from '@/models/IModalModels';

/**
 * 调用弹框的方法
 * @param modalData 
 */
export function  doLoadModal(modalData?:IModalEventData) {
   if (modalData) {
     EmitMsg(WidgetsEvent.ModalContainerWidget_LoadModal,modalData);
   }
 }
/**
 * 调用关闭弹框窗体的事件
 * @param modalData 
 */
export function doCloseModal(modalData?:IModalEventData)
{
  EmitMsg(WidgetsEvent.ModalContainerWidget_CloseModal,modalData);
}