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