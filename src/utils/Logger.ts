import { Global } from 'xframelib';
import * as  Log from "loglevel";
// Global.Logger=Log;
// Global.Logger.warn();

function Logger(name?:string) {
    //标记是否第一次判断
    if(!Global.firstLogger)
    {
      Global.Logger=Log;
        //开发环节和产品发布后
        if(import.meta.env.DEV||Global.Config.UI.ProductLog)
        {
          Log.enableAll();
        }
        else
          Log.disableAll();
      Global.firstLogger=true;
    }
    const logname = name || "default";
    return Log.getLogger(logname);
}

export default Logger;
