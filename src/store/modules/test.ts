import { defineStore, _DeepPartial } from "pinia";
interface IStudent{
    name?:string,
    age?:number,
    address?:string
}
export const testStore=defineStore('testStore',{
    state:()=>{
        const t:IStudent={
            name:'11111',
            age:142
        };
        return t;
    },
    actions:{
        init():any
        {
            this.name='345',
            this.age=15,
            this.address='788'
    
        }
    },
})