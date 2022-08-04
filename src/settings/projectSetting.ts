import type { ProjectConfig } from '#/config';
import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';

// ! 改动后需要清空浏览器缓存
const setting: ProjectConfig = {
  //#region 新增的，需要用的
  //是否收缩，默认收缩(左侧)
  leftCollapsed:false,
  //右侧，主内容的宽度
  layoutContentHeight:700,//document.body.clientWidth,
  layoutContentWidth:600,//document.body.clientHeight,
  //#endregion

  //#region 未启用配置字段（备用）
  // 是否显示SettingButton
  showSettingButton: true,
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  // 项目主题色
  themeColor: '#0960bd',
  // 色弱模式
  colorWeak: false,
  // // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  // fullContent: false,
  // 是否显示logo
  showLogo: true,
  // 是否显示底部信息 copyright
  showFooter: false,
  //底部栏高度
  footerHeight: 20,
  // 是否开启KeepAlive缓存  开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: true,
  // 是否使用全局错误捕获
  useErrorHandle: false,
  // 是否开启回到顶部
  useOpenBackTop: true,
  //#endregion

  // 头部配置
  headerSetting: {
    // 固定头部
    fixed: true,
    // 是否显示顶部
    show: true,
    //上侧Header栏高度64px
    height: 64,
    //居中显示Title
    centerTitle:false,
    // 显示全屏按钮
    showFullScreen: true,
     //是否显示收缩按钮
    showCollapseIcon:true,
    // 显示消息中心按钮
    showNotice: true,
  },
  // 菜单配置
  menuSetting: {
    // 背景色
    bgColor: '#273352',
    // 是否固定住菜单
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时候是否显示菜单名
    collapsedShowTitle: false,
    // 是否可拖拽
    canDrag: true,
    hidden: false,
    // 是否显示
    show: true,
    // 菜单最小宽度
    minWidth: 48,//48,
    // 菜单宽度
    menuWidth: 250,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 菜单主题
    // theme: ThemeEnum.DARK,
    // 分割菜单
    split: false,
    // 顶部菜单布局
    topMenuAlign: 'start',
    // 折叠触发器的位置
    trigger: TriggerEnum.HEADER,
    // 手风琴模式，只展示一个菜单
    accordion: true,
    // 在路由切换的时候关闭左侧混合菜单展开菜单
    closeMixSidebarOnChange: false,
    // 左侧混合菜单模块切换触发方式
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 是否固定左侧混合菜单
    mixSideFixed: false
  },

};

export default setting;
