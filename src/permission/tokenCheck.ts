import { userStore } from '@/store';
import { checkToken, Global, setLocalToken } from 'xframelib';
/**
 * 检查传入的Token
 * @param tokenValue 传入的Token值
 * @returns
 */
export default async function doTokenCheck(tokenValue: string) {
  const resultdata  = await checkToken(tokenValue).catch(ex=>{
    Global.Message?.warn(`token验证失败:${ex.message}!`);
 });
  if (resultdata) {
    const userState = userStore();
    //初始化
    userState.init(resultdata);
      //存储Token对象
      setLocalToken(resultdata.doubleToken);
      return true;
  }
  return false;
}
