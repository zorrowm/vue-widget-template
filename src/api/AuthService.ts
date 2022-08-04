	import{Global,requestGet,requestPost,requestPostBody} from 'xframelib'
	const baseURL:string= Global.Config.ServiceURL.DefaultWebAPI;
	/**
	* 登录
	* @param username 用户名
	* @param pwd 用户密码
	*/
	export async function Login(username?:string,pwd?:string):Promise<ResultModel>{
		const response=await requestGet(APIKey.Login, baseURL,{username,pwd});
		return response?.data as ResultModel;
	}
	/**
	* 获取系统所授权功能模型(单个)
	* @param system 系统id
	*/
	export async function GetAuthorizationFunc(system?:string):Promise<SysRoleRight>{
		const response=await requestGet(APIKey.GetAuthorizationFunc, baseURL,{system});
		return response?.data as SysRoleRight;
	}
	/**
	* 获取所授权所有系统
	*/
	export async function GetAuthorizationSystem():Promise<SysRoleRight[]>{
		const response=await requestGet(APIKey.GetAuthorizationSystem, baseURL,undefined);
		return response?.data as SysRoleRight[];
	}
	/**
	* 获取系统所授权功能模型(集合)
	* @param system 系统id(为空则全部)
	*/
	export async function GetAuthorizationFunc2(system?:string):Promise<SysRoleRight[]>{
		const response=await requestGet(APIKey.GetAuthorizationFunc2, baseURL,{system});
		return response?.data as SysRoleRight[];
	}
	/**
	* 刷新token(加验证)
	* @param refreshToken 刷新token(可为空)
	*/
	export async function RefreshToken(refreshToken?:string):Promise<any>{
		const response=await requestGet(APIKey.RefreshToken, baseURL,{refreshToken});
		return response?.data as any;
	}
	/**
	* 验证appkey是否存在
	* @param appkey 授权key
	*/
	export async function IsExistAppkey(appkey?:string):Promise<boolean>{
		const response=await requestGet(APIKey.IsExistAppkey, baseURL,{appkey});
		return response?.data as boolean;
	}
	/**
	* 检查用户名称不能重复
	* @param username 用户名
	*/
	export async function CheckLoginName(username?:string):Promise<boolean>{
		const response=await requestGet(APIKey.CheckLoginName, baseURL,{username});
		return response?.data as boolean;
	}
	/**
	* 注册用户
	* @param bodyParams UserCreateVM
	*/
	export async function Registered(bodyParams:UserCreateVM):Promise<ResultModel>{
		const response=await requestPostBody(APIKey.Registered, baseURL,bodyParams,undefined);
		return response?.data as ResultModel;
	}
	/**
	* token验证
	* @param token token(可为空)
	*/
	export async function CheckToken(token?:string):Promise<ResultModel>{
		const response=await requestGet(APIKey.CheckToken, baseURL,{token});
		return response?.data as ResultModel;
	}
	/**
	* 通过用户appkey获取信息
	* @param appkey 授权key
	*/
	export async function GetUserInfoByAppkey(appkey?:string):Promise<string>{
		const response=await requestGet(APIKey.GetUserInfoByAppkey, baseURL,{appkey});
		return response?.data as string;
	}
	/**
	* 退出登录
	* @param bodyParams Token
	*/
	export async function ExitLogin(bodyParams:Token):Promise<any>{
		const response=await requestPostBody(APIKey.ExitLogin, baseURL,bodyParams,undefined);
		return response?.data as any;
	}
	/**
	* undefined
	*/
	export async function GetUserSelfInfo():Promise<any>{
		const response=await requestGet(APIKey.GetUserSelfInfo, baseURL,undefined);
		return response?.data as any;
	}
	/**
	* 检查该功能用户是否可用(加验证)
	* @param token token信息
	* @param funcid 功能id信息
	*/
	export async function CheckFunc(token?:string,funcid?:string):Promise<string>{
		const response=await requestGet(APIKey.CheckFunc, baseURL,{token,funcid});
		return response?.data as string;
	}
	/**
	* 通过用户id获取用户信息
	* @param id 用户id
	*/
	export async function GetUserByID(id?:string):Promise<string>{
		const response=await requestGet(APIKey.GetUserByID, baseURL,{id});
		return response?.data as string;
	}
	/**
	* 通过token获取用户信息(加验证)
	* @param token token(可为空)
	* @param system 系统id(可为空)
	*/
	export async function GetUserInfoByToken(token?:string,system?:string):Promise<string>{
		const response=await requestGet(APIKey.GetUserInfoByToken, baseURL,{token,system});
		return response?.data as string;
	}
	/**
	* 通过用户名获取用户信息
	* @param userName 
	*/
	export async function GetUserByName(userName?:string):Promise<string>{
		const response=await requestGet(APIKey.GetUserByName, baseURL,{userName});
		return response?.data as string;
	}
	/**
	* 获取系统信息
	*/
	export async function GetProductList():Promise<string>{
		const response=await requestGet(APIKey.GetProductList, baseURL,undefined);
		return response?.data as string;
	}
	/**
	* 更新用户信息(加验证)
	* @param bodyParams UserCreateVM
	*/
	export async function UpdatetUser(bodyParams:UserCreateVM):Promise<boolean>{
		const response=await requestPostBody(APIKey.UpdatetUser, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 更新用户appkey(加验证)
	* @param infoid 用户id
	* @param appkey appkey
	*/
	export async function UpdatetUserAppkey(infoid?:string,appkey?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdatetUserAppkey, baseURL,{infoid,appkey},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新用户密码(加验证)
	* @param username 用户名
	* @param oldpwd 旧密码
	* @param newpwd 新密码
	*/
	export async function UpdateUserPWD(username?:string,oldpwd?:string,newpwd?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateUserPWD, baseURL,{username,oldpwd,newpwd},undefined);
		return response?.data as boolean;
	}
	/**
	* 用户角色升级
	*/
	export async function UpdateUserUpgrade():Promise<boolean>{
		const response=await requestGet(APIKey.UpdateUserUpgrade, baseURL,undefined);
		return response?.data as boolean;
	}
	/**
	* 获取组集合
	* @param keyword 关键字
	* @param pageindex 页数
	* @param pagesize 每页条数
	*/
	export async function GetDepartmentList(keyword?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetDepartmentList, baseURL,{keyword,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 判断组名称是否存在
	* @param name 名称
	* @param departmentid 所属于哪个组
	*/
	export async function GetDepartmentNameIsexist(name?:string,departmentid?:string):Promise<boolean>{
		const response=await requestGet(APIKey.GetDepartmentNameIsexist, baseURL,{name,departmentid});
		return response?.data as boolean;
	}
	/**
	* 通过组id 获取组信息
	* @param deparid 
	*/
	export async function GetDepartmentinfo(deparid?:string):Promise<string>{
		const response=await requestGet(APIKey.GetDepartmentinfo, baseURL,{deparid});
		return response?.data as string;
	}
	/**
	* 通过组id 获取组信息(带有子级树)
	* @param deparid 
	*/
	export async function GetFuncInfoTree(deparid?:string):Promise<string>{
		const response=await requestGet(APIKey.GetFuncInfoTree, baseURL,{deparid});
		return response?.data as string;
	}
	/**
	* 添加新的组
	* @param departmentid 隶属组id
	* @param name 名称
	* @param remark 备注或描述
	*/
	export async function SaveDepartment(departmentid?:string,name?:string,remark?:string):Promise<boolean>{
		const response=await requestPost(APIKey.SaveDepartment, baseURL,{departmentid,name,remark},undefined);
		return response?.data as boolean;
	}
	/**
	* 编辑组信息
	* @param departmentid 隶属组id
	* @param id 组id
	* @param name 名称
	* @param remark 备注或描述
	*/
	export async function UpdateDepartment(departmentid?:string,id?:string,name?:string,remark?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateDepartment, baseURL,{departmentid,id,name,remark},undefined);
		return response?.data as boolean;
	}
	/**
	* 批量删除组(只能删除未被用户绑定的部门)
	* @param bodyParams string[]
	*/
	export async function DeleteDepartmentList(bodyParams:string[]):Promise<boolean>{
		const response=await requestPostBody(APIKey.DeleteDepartmentList, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 获取组下用户
	* @param departID 组id
	* @param keyword 关键字
	* @param pageIndex 页数
	* @param pageSize 每页条数
	*/
	export async function GetGroupUserByDepartID(departID?:string,keyword?:string,pageIndex?:number,pageSize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetGroupUserByDepartID, baseURL,{departID,keyword,pageIndex,pageSize});
		return response?.data as string;
	}
	/**
	* 获取功能集合
	* @param sys 系统id
	*/
	export async function GetFuncsList(sys?:string):Promise<any>{
		const response=await requestGet(APIKey.GetFuncsList, baseURL,{sys});
		return response?.data as any;
	}
	/**
	* 更新路由菜单功能
	* @param id 功能id
	* @param sysid 系统id
	* @param title 标题
	* @param index 顺序
	*/
	export async function UpdateRoutmenu(id?:string,sysid?:string,title?:string,index:number):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateRoutmenu, baseURL,{id,sysid,title,index},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新Widget菜单功能
	* @param id undefined
	* @param sysid undefined
	* @param index undefined
	*/
	export async function UpdateWidgetmenu(id?:string,sysid?:string,index:number):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateWidgetmenu, baseURL,{id,sysid,index},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新Widget功能
	* @param id undefined
	* @param sysid undefined
	* @param label undefined
	*/
	export async function UpdateWidget(id?:string,sysid?:string,label?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateWidget, baseURL,{id,sysid,label},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新功能
	* @param id undefined
	* @param sysid undefined
	* @param name undefined
	*/
	export async function UpdateFunction(id?:string,sysid?:string,name?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateFunction, baseURL,{id,sysid,name},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新路由菜单功能
	* @param id undefined
	* @param sysid undefined
	* @param roleid undefined
	* @param title undefined
	* @param index undefined
	*/
	export async function UpdateRoutmenuByRole(id?:string,sysid?:string,roleid?:string,title?:string,index:number):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateRoutmenuByRole, baseURL,{id,sysid,roleid,title,index},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新Widget菜单功能
	* @param id undefined
	* @param sysid undefined
	* @param roleid undefined
	* @param index undefined
	*/
	export async function UpdateWidgetmenuByRole(id?:string,sysid?:string,roleid?:string,index:number):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateWidgetmenuByRole, baseURL,{id,sysid,roleid,index},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新Widget功能
	* @param id undefined
	* @param sysid undefined
	* @param roleid undefined
	* @param label undefined
	*/
	export async function UpdateWidgetByRole(id?:string,sysid?:string,roleid?:string,label?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateWidgetByRole, baseURL,{id,sysid,roleid,label},undefined);
		return response?.data as boolean;
	}
	/**
	* 更新功能
	* @param id undefined
	* @param sysid undefined
	* @param roleid undefined
	* @param name undefined
	*/
	export async function UpdateFunctionByRole(id?:string,sysid?:string,roleid?:string,name?:string):Promise<boolean>{
		const response=await requestPost(APIKey.UpdateFunctionByRole, baseURL,{id,sysid,roleid,name},undefined);
		return response?.data as boolean;
	}
	/**
	* 通过角色和系统 获取当前角色 下该系统 的权限
	* @param roleid 
	* @param sysid 
	*/
	export async function GetFuncByRoleId(roleid?:string,sysid?:string):Promise<any>{
		const response=await requestGet(APIKey.GetFuncByRoleId, baseURL,{roleid,sysid});
		return response?.data as any;
	}
	/**
	* 新建角色
超级管理员创建管理员角色，系统管理员只能创建普通角色，普通用户没角色创建权限
	* @param bodyParams Role
	*/
	export async function addRole(bodyParams:Role):Promise<string>{
		const response=await requestPostBody(APIKey.addRole, baseURL,bodyParams,undefined);
		return response?.data as string;
	}
	/**
	* 删除角色
	* @param bodyParams string[]
	*/
	export async function delRole(bodyParams:string[]):Promise<string>{
		const response=await requestPostBody(APIKey.delRole, baseURL,bodyParams,undefined);
		return response?.data as string;
	}
	/**
	* 角色更新
	* @param bodyParams Role
	*/
	export async function updateRole(bodyParams:Role):Promise<boolean>{
		const response=await requestPostBody(APIKey.updateRole, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 查询角色列表（暂时废弃，没想到有什么用）
	* @param keyword 
	* @param pageindex 
	* @param pagesize 
	*/
	export async function getRoleList(keyword?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.getRoleList, baseURL,{keyword,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 绑定用户和角色
	* @param userid 被授权用户id
	* @param roleid 角色id（通过方法getFreeRolesByUserid获取）
	*/
	export async function bindUserAndRole(userid?:string,roleid?:string):Promise<boolean>{
		const response=await requestGet(APIKey.bindUserAndRole, baseURL,{userid,roleid});
		return response?.data as boolean;
	}
	/**
	* 获取未授权角色列表
	* @param userid 被授权用户id
	*/
	export async function getFreeRolesByUserid(userid?:string):Promise<string>{
		const response=await requestGet(APIKey.getFreeRolesByUserid, baseURL,{userid});
		return response?.data as string;
	}
	/**
	* 绑定角色和系统
	* @param roleid 角色id
	* @param systemid 系统id
	*/
	export async function bindRoleAndSystem(roleid?:string,systemid?:string):Promise<boolean>{
		const response=await requestGet(APIKey.bindRoleAndSystem, baseURL,{roleid,systemid});
		return response?.data as boolean;
	}
	/**
	* 获取用户角色类型
	* @param userid 用户id
	*/
	export async function getRoleType(userid?:string):Promise<RoleType>{
		const response=await requestGet(APIKey.getRoleType, baseURL,{userid});
		return response?.data as RoleType;
	}
	/**
	* 通过用户id获取当前用户被授权的角色列表(被授予的权限只限于使用，不能授权给别的用户)
	* @param userid 用户id
	*/
	export async function getTakeRolesByUserid(userid?:string):Promise<string>{
		const response=await requestGet(APIKey.getTakeRolesByUserid, baseURL,{userid});
		return response?.data as string;
	}
	/**
	* 获取用户自身创建的角色列表（用户对着些角色拥有绝对的控制权（增删改查以及授权给别的用户））
	* @param userid 
	*/
	export async function getOwnRolesByUserid(userid?:string):Promise<string>{
		const response=await requestGet(APIKey.getOwnRolesByUserid, baseURL,{userid});
		return response?.data as string;
	}
	/**
	* undefined
	*/
	export async function saveFuncToRole():Promise<boolean>{
		const response=await requestGet(APIKey.saveFuncToRole, baseURL,undefined);
		return response?.data as boolean;
	}
	/**
	* undefined
	* @param roleid undefined
	* @param systemid undefined
	*/
	export async function getFunidsForRoleAndSystem(roleid?:string,systemid?:string):Promise<any>{
		const response=await requestGet(APIKey.getFunidsForRoleAndSystem, baseURL,{roleid,systemid});
		return response?.data as any;
	}
	/**
	* undefined
	*/
	export async function GetUsernameAndSystemname():Promise<any>{
		const response=await requestGet(APIKey.GetUsernameAndSystemname, baseURL,undefined);
		return response?.data as any;
	}
	/**
	* 获取系统集合时间排序
	* @param keyword 关键字
	* @param pageindex 页数
	* @param pagesize 每页条数
	*/
	export async function GetSystemsList(keyword?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetSystemsList, baseURL,{keyword,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 通过角色id获取系统集合
	* @param roleid 
	*/
	export async function GetSystemsListByRole(roleid?:string):Promise<string>{
		const response=await requestGet(APIKey.GetSystemsListByRole, baseURL,{roleid});
		return response?.data as string;
	}
	/**
	* 获取系统(版本)集合(不分页)
	*/
	export async function GetSystemsVersionList():Promise<string>{
		const response=await requestGet(APIKey.GetSystemsVersionList, baseURL,undefined);
		return response?.data as string;
	}
	/**
	* 获取系统集合(根据系统类型排序)
	* @param keyword 关键字
	* @param pageindex 页数
	* @param pagesize 每页条数
	*/
	export async function GetSystemsListByName(keyword?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetSystemsListByName, baseURL,{keyword,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 获取当前用户可管理系统
	*/
	export async function GetSystemsListByAdminRole():Promise<string>{
		const response=await requestGet(APIKey.GetSystemsListByAdminRole, baseURL,undefined);
		return response?.data as string;
	}
	/**
	* 只获取系统(不分页)
	*/
	export async function GetSystemFuncs():Promise<string>{
		const response=await requestGet(APIKey.GetSystemFuncs, baseURL,undefined);
		return response?.data as string;
	}
	/**
	* 判断系统名称是否存在
	* @param name 名称
	*/
	export async function GetSystemNameIsexist(name?:string):Promise<boolean>{
		const response=await requestGet(APIKey.GetSystemNameIsexist, baseURL,{name});
		return response?.data as boolean;
	}
	/**
	* 添加新的系统
	* @param name 系统名称
	* @param desc 系统描述
	*/
	export async function SaveSystem(name?:string,desc?:string):Promise<boolean>{
		const response=await requestPost(APIKey.SaveSystem, baseURL,{name,desc},undefined);
		return response?.data as boolean;
	}
	/**
	* 编辑系统
	* @param bodyParams System
	*/
	export async function UpdateSystem(bodyParams:System):Promise<boolean>{
		const response=await requestPostBody(APIKey.UpdateSystem, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 批量删除功能
	* @param bodyParams string[]
	*/
	export async function DeleteSystemList(bodyParams:string[]):Promise<boolean>{
		const response=await requestPostBody(APIKey.DeleteSystemList, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 导入系统及功能
	* @param bodyParams SysRoleRight2
	*/
	export async function ImportSystemFile(bodyParams:SysRoleRight2):Promise<boolean>{
		const response=await requestPostBody(APIKey.ImportSystemFile, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 测试方法导入
	* @param path 路径
	*/
	export async function TestImportSystemFile(path?:string):Promise<boolean>{
		const response=await requestGet(APIKey.TestImportSystemFile, baseURL,{path});
		return response?.data as boolean;
	}
	/**
	* 获取用户集合
	* @param keyword 关键字
	* @param pageindex 页数
	* @param pagesize 每页条数
	*/
	export async function GetUsersList(keyword?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetUsersList, baseURL,{keyword,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 根据角色或系统获取用户列表（角色id不为空根据角色id筛选，角色id和系统id都为空返回所有关联用户）
	* @param roleid 角色id
	* @param systemid 系统id
	* @param pageindex 
	* @param pagesize 
	*/
	export async function GetUsersListByRoleOrSystem(roleid?:string,systemid?:string,pageindex?:number,pagesize?:number):Promise<string>{
		const response=await requestGet(APIKey.GetUsersListByRoleOrSystem, baseURL,{roleid,systemid,pageindex,pagesize});
		return response?.data as string;
	}
	/**
	* 通过用户(id或用户名)获取用户信息
	* @param key id或用户名
	*/
	export async function GetUserInfoByName(key?:string):Promise<string>{
		const response=await requestGet(APIKey.GetUserInfoByName, baseURL,{key});
		return response?.data as string;
	}
	/**
	* 保存用户信息
	* @param bodyParams User
	*/
	export async function SaveUser(bodyParams:User):Promise<boolean>{
		const response=await requestPostBody(APIKey.SaveUser, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 更新用户信息
	* @param bodyParams User
	*/
	export async function UpdateUser(bodyParams:User):Promise<boolean>{
		const response=await requestPostBody(APIKey.UpdateUser, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 更新用户角色
	* @param bodyParams UserRoleUpdat
	*/
	export async function UpdateUserRole(bodyParams:UserRoleUpdat):Promise<boolean>{
		const response=await requestPostBody(APIKey.UpdateUserRole, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 删除用户
	* @param bodyParams string[]
	*/
	export async function DeleteUser(bodyParams:string[]):Promise<boolean>{
		const response=await requestPostBody(APIKey.DeleteUser, baseURL,bodyParams,undefined);
		return response?.data as boolean;
	}
	/**
	* 批量锁定用户
	* @param id 用户id
	* @param islock 是否锁定
	*/
	export async function LockedUserList(id?:string,islock:boolean):Promise<boolean>{
		const response=await requestPost(APIKey.LockedUserList, baseURL,{id,islock},undefined);
		return response?.data as boolean;
	}
	/**
	* undefined
	*/
	export async function WeatherForecast():Promise<WeatherForecast[]>{
		const response=await requestGet(APIKey.WeatherForecast, baseURL,undefined);
		return response?.data as WeatherForecast[];
	}
	const APIKey={
	Login:'/api/Login/Login',
	GetAuthorizationFunc:'/api/Check/GetAuthorizationFunc',
	GetAuthorizationSystem:'/api/Check/GetAuthorizationSystem',
	GetAuthorizationFunc2:'/api/Check/GetAuthorizationFunc2',
	RefreshToken:'/api/Check/RefreshToken',
	IsExistAppkey:'/api/Check/IsExistAppkey',
	CheckLoginName:'/api/Check/CheckLoginName',
	Registered:'/api/Check/Registered',
	CheckToken:'/api/Check/CheckToken',
	GetUserInfoByAppkey:'/api/Check/GetUserInfoByAppkey',
	ExitLogin:'/api/Check/ExitLogin',
	GetUserSelfInfo:'/api/Check/GetUserSelfInfo',
	CheckFunc:'/api/Check/CheckFunc',
	GetUserByID:'/api/Check/GetUserByID',
	GetUserInfoByToken:'/api/Check/GetUserInfoByToken',
	GetUserByName:'/api/Check/GetUserByName',
	GetProductList:'/api/Check/GetProductList',
	UpdatetUser:'/api/Check/UpdatetUser',
	UpdatetUserAppkey:'/api/Check/UpdatetUserAppkey',
	UpdateUserPWD:'/api/Check/UpdateUserPWD',
	UpdateUserUpgrade:'/api/Check/UpdateUserUpgrade',
	GetDepartmentList:'/api/Department/GetDepartmentList',
	GetDepartmentNameIsexist:'/api/Department/GetDepartmentNameIsexist',
	GetDepartmentinfo:'/api/Department/GetDepartmentinfo',
	GetFuncInfoTree:'/api/Department/GetFuncInfoTree',
	SaveDepartment:'/api/Department/SaveDepartment',
	UpdateDepartment:'/api/Department/UpdateDepartment',
	DeleteDepartmentList:'/api/Department/DeleteDepartmentList',
	GetGroupUserByDepartID:'/api/Department/GetGroupUserByDepartID',
	GetFuncsList:'/api/Funcs/GetFuncsList',
	UpdateRoutmenu:'/api/Funcs/UpdateRoutmenu',
	UpdateWidgetmenu:'/api/Funcs/UpdateWidgetmenu',
	UpdateWidget:'/api/Funcs/UpdateWidget',
	UpdateFunction:'/api/Funcs/UpdateFunction',
	UpdateRoutmenuByRole:'/api/Funcs/UpdateRoutmenuByRole',
	UpdateWidgetmenuByRole:'/api/Funcs/UpdateWidgetmenuByRole',
	UpdateWidgetByRole:'/api/Funcs/UpdateWidgetByRole',
	UpdateFunctionByRole:'/api/Funcs/UpdateFunctionByRole',
	GetFuncByRoleId:'/api/Funcs/GetFuncByRoleId',
	addRole:'/api/Role/addRole',
	delRole:'/api/Role/delRole',
	updateRole:'/api/Role/updateRole',
	getRoleList:'/api/Role/getRoleList',
	bindUserAndRole:'/api/Role/bindUserAndRole',
	getFreeRolesByUserid:'/api/Role/getFreeRolesByUserid',
	bindRoleAndSystem:'/api/Role/bindRoleAndSystem',
	getRoleType:'/api/Role/getRoleType',
	getTakeRolesByUserid:'/api/Role/getTakeRolesByUserid',
	getOwnRolesByUserid:'/api/Role/getOwnRolesByUserid',
	saveFuncToRole:'/api/Role/saveFuncToRole',
	getFunidsForRoleAndSystem:'/api/Role/getFunidsForRoleAndSystem',
	GetUsernameAndSystemname:'/api/Role/GetUsernameAndSystemname',
	GetSystemsList:'/api/System/GetSystemsList',
	GetSystemsListByRole:'/api/System/GetSystemsListByRole',
	GetSystemsVersionList:'/api/System/GetSystemsVersionList',
	GetSystemsListByName:'/api/System/GetSystemsListByName',
	GetSystemsListByAdminRole:'/api/System/GetSystemsListByAdminRole',
	GetSystemFuncs:'/api/System/GetSystemFuncs',
	GetSystemNameIsexist:'/api/System/GetSystemNameIsexist',
	SaveSystem:'/api/System/SaveSystem',
	UpdateSystem:'/api/System/UpdateSystem',
	DeleteSystemList:'/api/System/DeleteSystemList',
	ImportSystemFile:'/api/System/ImportSystemFile',
	TestImportSystemFile:'/api/System/TestImportSystemFile',
	GetUsersList:'/api/UserManage/GetUsersList',
	GetUsersListByRoleOrSystem:'/api/UserManage/GetUsersListByRoleOrSystem',
	GetUserInfoByName:'/api/UserManage/GetUserInfoByName',
	SaveUser:'/api/UserManage/SaveUser',
	UpdateUser:'/api/UserManage/UpdateUser',
	UpdateUserRole:'/api/UserManage/UpdateUserRole',
	DeleteUser:'/api/UserManage/DeleteUser',
	LockedUserList:'/api/UserManage/LockedUserList',
	WeatherForecast:'/WeatherForecast',
	}
	export interface ResultModel{
		isSuccess:boolean,
		resultValue?:any,
		resultDescription?:string
	}
	export interface Menus{
		path?:string,
		name?:string,
		type?:number,
		title?:string,
		index?:number,
		children?:any[]
	}
	export interface WidgetMenus{
		name?:string,
		index?:number,
		path?:string,
		type?:number,
		children?:any[]
	}
	export interface Widgets{
		id?:string,
		lable?:string,
		container?:number,
		preload?:boolean,
		afterid?:string,
		bindid?:string,
		group?:string
	}
	export interface Functions{
		id?:string,
		name?:string,
		children?:any[]
	}
	export interface SysRoleRight{
		id?:string,
		name?:string,
		group?:string,
		version?:string,
		product?:string,
		routes?:any[],
		widgetMenu?:any[],
		widgets?:any[],
		functions?:any[]
	}
	export interface UserCreateVM{
		id?:string,
		name?:string,
		password?:string,
		photo?:string,
		mobile?:string,
		qq?:string,
		email?:string,
		idcard?:string,
		realname?:string,
		sex?:string,
		appkey?:string
	}
	export interface Token{
		token?:string,
		reftoken?:string
	}
	export interface Function{
		id?:string,
		key?:string,
		name?:string,
		parentid?:string,
		createtime?:string,
		userid?:string,
		update?:string,
		system?:string,
		children?:any[],
		systemNavigation:System
	}
	export interface Routmenu{
		id?:string,
		path?:string,
		name?:string,
		type?:number,
		title?:string,
		index?:number,
		parentid?:string,
		createtime?:string,
		userid?:string,
		update?:string,
		system?:string,
		children?:any[],
		systemNavigation:System
	}
	export interface Rolefunc{
		id?:string,
		rolesystem?:string,
		type:number,
		func?:string,
		title?:string,
		label?:string,
		name?:string,
		index?:number,
		rolesystemNavigation:Rolesystem
	}
	export interface Rolesystem{
		id?:string,
		role?:string,
		system?:string,
		rolename?:string,
		systemname?:string,
		roleNavigation:Role,
		systemNavigation:System,
		rolefuncs?:any[]
	}
	export interface Widgetmenu{
		id?:string,
		name?:string,
		index?:number,
		path?:string,
		type?:number,
		parentid?:string,
		createtime?:string,
		userid?:string,
		update?:string,
		system?:string,
		children?:any[],
		systemNavigation:System
	}
	export interface Widget{
		id?:string,
		key?:string,
		label?:string,
		container?:number,
		preload?:boolean,
		afterid?:string,
		bindid?:string,
		group?:string,
		createtime?:string,
		userid?:string,
		update?:string,
		system?:string,
		children?:any[],
		systemNavigation:System
	}
	export interface System{
		id?:string,
		name?:string,
		descreaption?:string,
		cjrid?:string,
		cjsj:string,
		group?:string,
		version?:string,
		product?:string,
		functions?:any[],
		routmenus?:any[],
		rolesystems?:any[],
		widgetmenus?:any[],
		widgets?:any[]
	}
	export interface User{
		id?:string,
		departmentid?:string,
		name?:string,
		realname?:string,
		idcard?:string,
		sex?:string,
		usercode?:string,
		photo?:string,
		mobile?:string,
		qq?:string,
		email?:string,
		careerentry?:string,
		leavedate?:string,
		leaderid?:string,
		positionid?:string,
		password?:string,
		issystem?:boolean,
		islocked?:boolean,
		remark?:string,
		cjsj?:string,
		sfyxgmm?:boolean,
		appkey?:string,
		systems?:any[],
		createName?:string,
		userRoles?:any[]
	}
	export interface UserRole{
		userid?:string,
		roleid?:string,
		id?:string,
		type:number,
		role:Role,
		user:User
	}
	export interface Role{
		id?:string,
		name?:string,
		aliasname?:string,
		description?:string,
		cjrid?:string,
		cjsj?:string,
		isdefault?:boolean,
		type:number,
		systems?:any[],
		rolesystems?:any[],
		userRoles?:any[]
	}
	export interface SysRoleRight2{
		id?:string,
		name?:string,
		version?:string,
		group?:string,
		product?:string,
		routes?:any[],
		widgetMenu?:any[],
		widgets?:any[],
		functions?:any[]
	}
	export interface UserRoleUpdat{
		userId?:string,
		licroleids?:string[]
	}
	export interface WeatherForecast{
		date:string,
		temperatureC:number,
		temperatureF:number,
		summary?:string
	}
