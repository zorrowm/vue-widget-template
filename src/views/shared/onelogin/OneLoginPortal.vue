<template>
    <div>
        <div class="valid-portal-header">统一权限验证系统导航页</div>
        <div class="valid-portal-content">
            <div v-if="isOneLogin">
            <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, xxxl: 2 }" :data-source="data">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-card :title="item.title">Card content</a-card>
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <div v-else>
            <img/>
           <span class="" >5秒后跳转，或点击 <a href="/#/onelogin">统一验证登录界面</a>跳转</span>
        </div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { Global } from 'xframelib';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isOneLogin = ref<boolean>(true);
if(Global.UserInfo)
{
    let roles: Array<object> = Global.UserInfo?.Roles
    let result: Array<object> = []
    roles.forEach(current => {
        result.push(...(current?.Syslist))
    })
    Global.Logger().info("权限列表", result)
}
else
{
   isOneLogin.value=false;
   const router=useRouter();
   setTimeout(() => {
    router.push("onelogin");
   }, 5000);

}

interface DataItem {
    title: string;
}
const data: DataItem[] = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 5',
    },
    {
        title: 'Title 6',
    },
];

</script>

<style lang="scss" scoped>
.valid-portal-header
{
    height:40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 28px;
    line-height: 40px;
    background-color: aqua;
}
.valid-portal-content
{
    width:60%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    background-color: #f00;
}
</style>