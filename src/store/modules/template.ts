import { Storage, deepMerge } from "xframelib";
import { defineStore, _DeepPartial } from "pinia";

//唯一的Storage的Key值
const STORE_SAVE_KEY = "STORE_SAVE_KEY";
//示例名称为 templateStorage,可不修改，也可改为 xxxStorage
const templateStorage = new Storage("", sessionStorage);
//store示例模型接口
interface IXxxModel {
  sysid: string; //当前选中:系统ID，（要外部转为ref对象的）
  userid: string; //当前选中：用户ID，（要外部转为ref对象的）
  dirPath?: string; //当前选中：文件夹路径
  parentPath?: string; //父文件夹路径
}
const defaultObj: IXxxModel = { sysid: "", userid: "" };
//示例名为templateStore,修改为xxxStore
export const templateStore = defineStore("templateStore", {
  state: () => {
    const cacheValue = templateStorage.get(STORE_SAVE_KEY);
    const t: IXxxModel = cacheValue || defaultObj;
    if (!cacheValue) {
      templateStorage.set(STORE_SAVE_KEY, defaultObj);
    }
    return t;
  },
  actions: {
    /**
     * 获取缓存
     * @returns 
     */
    getCacheStore():IXxxModel {
      let cacheValue = templateStorage.get(STORE_SAVE_KEY);
      if (!cacheValue) cacheValue = defaultObj;
      return cacheValue as IXxxModel;
    },
    /**
     * 保存
     */
    saveCacheStore() {
      templateStorage.set(STORE_SAVE_KEY, this.$state);
    },
    /**
     * 初始化
     */
    init() {},
    /**
     * 清除
     */
    clear() {
     if(templateStorage)
      templateStorage.remove(STORE_SAVE_KEY);
    },
    /**
     * 改变部分字段值的对象
     * @param partialObj 部分模型对象
     */
    setPartialState(partialObj:_DeepPartial<IXxxModel>)
    {
        if(partialObj)
        {
            deepMerge(this.$state,partialObj);
            this.saveCacheStore();
        }
    },
    //更新，测试
    testUpdate(keyPath: Array<string>) {
        if (keyPath) {
          this.sysid = keyPath[0];
          this.userid = keyPath[1];
          this.saveCacheStore();
        }
    },
  },
});
