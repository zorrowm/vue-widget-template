export type LocaleType = "zh_CN" | "en" | "ru" | "ja" | "ko";

/**
 * 左侧菜单
 */
export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  minWidth: number; //最小宽度
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  // theme: ThemeEnum;
  topMenuAlign: "start" | "center" | "end";
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

// export interface MultiTabsSetting {
//   cache: boolean;
//   show: boolean;
//   showQuick: boolean;
//   canDrag: boolean;
//   showRedo: boolean;
//   showFold: boolean;
// }
/**
 * 头部的配置
 */
export interface HeaderSetting {
  fixed: boolean;
  //是否显示头部栏
  show: boolean;
  //Header Default Height
  height: number;
 //居中显示Title
  centerTitle:boolean,
  // Turn on full screen
  showFullScreen: boolean;
  //是否显示收缩按钮
  showCollapseIcon:boolean;
  // Show message center button
  showNotice: boolean;
}


export interface ProjectConfig {
  //#region 新增的，根据业务需要进行增加
  //是否收缩，默认收缩(左侧)
  leftCollapsed: boolean;
  // 针对后台类布局的设置
  //右侧-主内容高度
  layoutContentHeight: number; 
  //右侧-主内容宽度
  layoutContentWidth: number; 
  //#endregion

  //#region  未启用配置字段（备用）
  // 是否显示SettingButton
  showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // Theme color
  themeColor: string;
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // Whether to open back to top
  useOpenBackTop: boolean;
  //#endregion

  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
  //底部栏的高度
  footerHeight: number;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
}
