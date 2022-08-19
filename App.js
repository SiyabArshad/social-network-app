import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View,useColorScheme } from 'react-native';
import {NavigationContainer,DefaultTheme,DarkTheme} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
const Stack=createStackNavigator()
import Signup from './app/screens/Signup';
import { lightcolors,darkcolors } from './app/configurations/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './app/screens/Login';
import Forgotpassword from "./app/screens/Forgotpassword"
import ResetPassword from "./app/screens/ResetPassword"
import Verification from "./app/screens/Verification"
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
export default function App() {
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
  console.log(scheme)
  return (
    <>
      <NavigationContainer   theme={scheme==='dark'?NightTheme:LightTheme}>
        <StatusBar></StatusBar>
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
          <Stack.Screen name="signup" component={Signup}></Stack.Screen>
          <Stack.Screen name="signin" component={Login}></Stack.Screen>
          <Stack.Screen name="forgot" component={Forgotpassword}></Stack.Screen>
          <Stack.Screen name="reset" component={ResetPassword}></Stack.Screen>
          <Stack.Screen name="verify" component={Verification}></Stack.Screen>
        
        </Stack.Navigator>
      </NavigationContainer>
    </>

    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
