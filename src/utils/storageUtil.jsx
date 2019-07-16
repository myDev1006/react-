import store from "store";
const userkey = "userkey";
export default{
    saveuser(user){
     store.set(userkey,user);
    },
    getuser(){
        return store.get(userkey)||{};
    },
    cleanuser(){
        store.remove(userkey);
    }
}