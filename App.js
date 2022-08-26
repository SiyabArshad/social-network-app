import * as React from "react"
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View,useColorScheme,ActivityIndicator } from 'react-native';
import {NavigationContainer,DefaultTheme,DarkTheme} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
const Stack=createStackNavigator()
import Signup from './app/screens/Signup';
import { lightcolors,darkcolors } from './app/configurations/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './app/screens/Login';
import Forgotpassword from "./app/screens/Forgotpassword"
import Home from './app/screens/Home';
import Comments from './app/screens/Comments';
import Twitter from './app/screens/Twitter';
import Notification from './app/screens/Notification';
import ContentMenu from './app/screens/ContentMenu';
import Addpost from './app/screens/Addpost';
import AddTweet from './app/screens/AddTweet';
import AddStory from './app/screens/AddStory';
import Contacts from './app/screens/Contacts';
import Story from './app/screens/Story';
import Inbox from './app/screens/Inbox';
import Profile from './app/screens/Profile';
import Following from "./app/screens/Following"
import Follower from "./app/screens/Follower"
import Setting from './app/screens/Setting';
import EditProfile from './app/screens/Editprofile';
import { Provider } from 'react-redux';
import { useSelector,useDispatch } from 'react-redux';
import store from "./app/redux/store"
import { Authcontext } from './app/redux/auth';
import {Init} from "./app/redux/action"
import * as Notifications from 'expo-notifications';
import { LogBox } from 'react-native';

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  return (
  <Provider store={store}>
    <AppWapper></AppWapper>
  </Provider>  
  );
}
export const AppWapper=()=>
{
  const LightTheme={
    ...DefaultTheme,
    colors:{
      ...DefaultTheme.colors,
      primary:lightcolors.primary,
      lightprimary:lightcolors.lightprimary,
      secondary:lightcolors.secondary,
      black:lightcolors.black,
      white:lightcolors.white,
      grey1:lightcolors.grey1,
      grey2:lightcolors.grey2,
      feildscolor:lightcolors.feildscolor
    }
  }
  const NightTheme={
    ...DarkTheme,
    colors:{
      ...DarkTheme.colors,
      primary:darkcolors.primary,
      lightprimary:darkcolors.lightprimary,
      secondary:darkcolors.secondary,
      black:darkcolors.black,
      white:darkcolors.white,
      grey1:darkcolors.grey1,
      grey2:darkcolors.grey2,
      feildscolor:darkcolors.feildscolor
    }
  }
  const scheme=useColorScheme()
  const [loading,setloading]=React.useState(true)

  const userinfo = useSelector(state => state.Reducers.user);
  const {user}=Authcontext()
  console.log(scheme)
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init());
    setloading(false);
  }
  const controller=new AbortController()
  React.useEffect(() => {
    init()
    return ()=>{
      controller.abort()
    }
  }, [])
if(loading)
{
  return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator color={"purple"} size="large"></ActivityIndicator>
    </View>
  )
}
else
{
return (
 <NavigationContainer   theme={scheme==='dark'?NightTheme:LightTheme}>
  <StatusBar></StatusBar>
{user&&userinfo?<ProtectedRoutes/>:<Base/>}
</NavigationContainer>
)
}
}
const ProtectedRoutes=()=>{
  return(
    <Stack.Navigator   screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home}></Stack.Screen>
        <Stack.Screen name="profile" component={Profile}></Stack.Screen>
        <Stack.Screen name="edit" component={EditProfile}></Stack.Screen>
        <Stack.Screen name="twitter" component={Twitter}></Stack.Screen>  
        <Stack.Screen name="addcontent" component={ContentMenu}></Stack.Screen>  
        <Stack.Screen name="addpost" component={Addpost}></Stack.Screen>
        <Stack.Screen name="addtweet" component={AddTweet}></Stack.Screen>  
        <Stack.Screen name="addstory" component={AddStory}></Stack.Screen>
        <Stack.Screen name="contacts" component={Contacts}></Stack.Screen>
        <Stack.Screen name="following" component={Following}></Stack.Screen>
        <Stack.Screen name="follower" component={Follower}></Stack.Screen>
        <Stack.Screen name="setting" component={Setting}></Stack.Screen>
        <Stack.Screen name="inbox" component={Inbox}></Stack.Screen>
        <Stack.Screen name="story" component={Story}></Stack.Screen>  
        <Stack.Screen name="comments" component={Comments}></Stack.Screen> 
        <Stack.Screen name="notifications" component={Notification}></Stack.Screen> 
    </Stack.Navigator>
  )
}

const Base=()=>{
  return(
<Stack.Navigator screenOptions={{headerShown:false}}>
<Stack.Screen name="signup" component={Signup}></Stack.Screen>
<Stack.Screen name="signin" component={Login}></Stack.Screen>
<Stack.Screen name="forgot" component={Forgotpassword}></Stack.Screen>
 </Stack.Navigator> 
  )
}


