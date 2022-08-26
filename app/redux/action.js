import AsyncStorage from "@react-native-async-storage/async-storage"
export const Init = () => {
    return async dispatch => {
      let token = await AsyncStorage.getItem('fiyruser');
      if (token !== null) {
        const user= JSON.parse(token)
        dispatch({
          type: 'loginuser',
          payload: user,
        })
      }
    }
  }
  
export const loginuser=(user)=>{
    return async(dispatch)=>{
        await AsyncStorage.setItem("fiyruser",JSON.stringify(user))
        return dispatch({
            payload:user,
            type:"loginuser"
        })
    }
}
export const updateuser=(user)=>{
  return async(dispatch)=>{
      await AsyncStorage.setItem("fiyruser",JSON.stringify(user))
      return dispatch({
          payload:user,
          type:"loginuser"
      })
  }
}
export const logoutuser=()=>{
    return async(dispatch)=>{
        await AsyncStorage.removeItem("fiyruser")
        return dispatch({
            type:"logout"
        })
    }
}