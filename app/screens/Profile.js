import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,Switch,ActivityIndicator,Dimensions,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
import { AntDesign,Entypo,EvilIcons,FontAwesome5,Feather } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
import { Video, AVPlaybackStatus } from 'expo-av';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, getDoc,getDocs,collection,serverTimestamp, updateDoc,query,where,orderBy} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {updateuser} from "../redux/action"
import sendPushNotification from '../configurations/notificationalerts'
import { useIsFocused } from "@react-navigation/native";

export default function Profile({navigation,route}) {
  const isFocused = useIsFocused();
  const auth=getAuth(app)
  const db=getFirestore(app)
  const dispatch=useDispatch()
  const [loading,setloading]=React.useState(false)
  const {userid}=route.params
  const [accountdetail,setaccountdetail]=React.useState(null)
  const [followers,setfollowers]=React.useState(null)
  const [following,setfollowing]=React.useState(null)
  const [deviceuserfollowing,setdeviceuserfollowing]=React.useState(null)
  const {colors}=useTheme()
  const [isfollowed, setIsfollowed] = React.useState(false);
  const [isprivate, setIsprivate] = React.useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const userinfo = useSelector(state => state.Reducers.user);
  const [posts,setposts]=React.useState([])

  const getuserinfo=async()=>{
    setloading(true)
    const qs=query(collection(db, "posts"),where("userid","==",userid))
    getDocs(qs).then((res)=>{
      const quests1=res.docs.map(doc=>({
          data:doc.data(),
          id:doc.id
        }))
      setposts(quests1)
    }).catch(()=>{
     })          
   
    followerinfo()
    followinginfo()
    if(userid!==auth.currentUser.uid)
    {
      const docRef = doc(db, "users", userid);
      const docSnap = await getDoc(docRef);
      setaccountdetail(docSnap.data())
    }
    else
    {
      setaccountdetail(userinfo)
    }
    setloading(false)
  }


  const followerinfo=async()=>{
      const docRef = doc(db, "followers", userid);
      const docSnap = await getDoc(docRef);
      setfollowers(docSnap.data())
  }
  const followinginfo=async()=>{
    const docRef = doc(db, "following", userid);
      const docSnap = await getDoc(docRef);
      setfollowing(docSnap.data())
      const docRef1=doc(db,"following",auth.currentUser.uid)
      const docSnap1=await getDoc(docRef1)
      setdeviceuserfollowing(docSnap1.data())
      const followerexist=docSnap1.data().followings.filter((item)=>item.userid===userid)
      setIsfollowed(followerexist?.length==0?false:true)
  }
 
  const followfunction=async()=>{
      /*if(deviceuserfollowing?.followings.filter((item)=>item.userid===userid)||followers?.followers.filter((item)=>item.userid===auth.currentUser.uid))
      {
        setIsfollowed(false)
        return false
      }
     else
     {*/
      setIsfollowed(true)
      let newfollowing=deviceuserfollowing?.followings
      let newfollowers=followers?.followers
      newfollowing?.push({
        userid:userid
      })
      newfollowers.push({
        userid:auth.currentUser.uid
      }) 
      const followersref = doc(db, "followers", userid);
      const followingref = doc(db, "following", auth.currentUser.uid);
      await updateDoc(followersref, 
          {
            followers:newfollowers,
          }
          )
      await updateDoc(followingref, 
              {
                followings:newfollowing,
              }
              )   
            let stringnotify=accountdetail?.username+" "+"started following you"
            sendPushNotification(accountdetail?.token,stringnotify)
          let nameoffollower='Followed '+accountdetail.username
          let toast = Toast.show(nameoffollower, {
              duration: Toast.durations.LONG,
            });
            setTimeout(function hideToast() {
              Toast.hide(toast);
            }, 1000);
          
  }
  const unfollowfunction=async()=>{
    setIsfollowed(false)
    let newfollowing=deviceuserfollowing?.followings.filter((item)=>item.userid!==userid)
    let newfollowers=followers?.followers.filter((item)=>item.userid!==auth.currentUser.uid)
      const followersref = doc(db, "followers", userid);
      const followingref = doc(db, "following", auth.currentUser.uid);
      await updateDoc(followersref, 
          {
            followers:newfollowers,
          }
          )
      await updateDoc(followingref, 
          {
                followings:newfollowing,
          }
              )   
          let stringnotify=accountdetail?.username+" "+"Unfollows you"
          sendPushNotification(accountdetail?.token,stringnotify)
          let nameoffollower='UnFollowed '+accountdetail.username
          let toast = Toast.show(nameoffollower, {
              duration: Toast.durations.LONG,
            });
            setTimeout(function hideToast() {
              Toast.hide(toast);
            }, 1000);
  }
  //function for public and private account in app
  const publicprivatefunction=async()=>{
      setIsprivate(!isprivate)
      await updateDoc(doc(db,"users",auth.currentUser.uid),{
        ispublic:!isprivate
      })
      userinfo.ispublic=!isprivate
      await dispatch(updateuser(userinfo))
      let toast = Toast.show("Your Account Settings are Updated", {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 2000);
    }
//ends

  const controller=new AbortController()
  React.useEffect(()=>{
    if(isFocused)
    {
    getuserinfo()
    }
    return ()=>{
      controller.abort()
    }
  },[isFocused])
  if(loading)
  {
      return(
       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           <ActivityIndicator color={colors.primary} size="large"></ActivityIndicator>
       </View>
      )
  }
  else
  {
  return (
    <View
    style={{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:"space-between"
    }}
    > 
<View style={{marginTop:RFPercentage(5),padding:RFPercentage(2)}}>
  <View style={{display:'flex',justifyContent:"space-between",flexDirection:"row"}}>
    <Text style={{color:colors.grey2}}>@{accountdetail?.username}</Text>
    <TouchableOpacity style={{display:userid!==auth.currentUser.uid?"none":"flex"}} onPress={()=>navigation.navigate("setting")}>
    <Feather name="settings" size={24} color={colors.primary} />
    </TouchableOpacity>
  </View>
  <View style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <Image style={{height:RFPercentage(12),width:RFPercentage(12),borderRadius:RFPercentage(6)}} source={accountdetail?.profile?{uri:accountdetail?.profile}:require("../../assets/profile.jpeg")}></Image>
    <Text style={{marginTop:RFPercentage(1.2),fontSize:RFPercentage(2)}}>{accountdetail?.username}</Text>
    <Text style={{color:colors.grey2,marginTop:RFPercentage(.1)}}>{accountdetail?.desc}</Text>
  </View>
  <View style={{display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"row",marginVertical:RFPercentage(.7)}}>
        {
          isfollowed?
            <TouchableOpacity 
            onPress={unfollowfunction}
            style={{backgroundColor:colors.primary,paddingHorizontal:RFPercentage(1.3)
            ,paddingVertical:RFPercentage(1.2),
            borderRadius:RFPercentage(.5),
            display:userid===auth.currentUser.uid||!isfollowed?"none":"flex",
            }}
            disabled={!isfollowed}
            >
              <Text style={{color:colors.white}}>UnFollow</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity 
            disabled={isfollowed}
            onPress={followfunction}
            style={{backgroundColor:colors.primary,paddingHorizontal:RFPercentage(1.3)
              ,paddingVertical:RFPercentage(1.2),
              borderRadius:RFPercentage(.5),
              display:userid===auth.currentUser.uid||isfollowed?"none":"flex",
              }}>
                <Text style={{color:colors.white}}>Follow</Text>
              </TouchableOpacity>
        }
      <Text style={{display:userid!==auth.currentUser.uid?"none":"flex",color:colors.primary,fontSize:RFPercentage(2.2),marginRight:RFPercentage(2)}}>{accountdetail?.ispublic?"Private":"Public"}</Text>
    <Switch
        trackColor={{ false: colors.lightprimary, true: colors.primary }}
        thumbColor={isprivate ? colors.primary : colors.primary}
        ios_backgroundColor={colors.lightprimaryprimary}
        onValueChange={publicprivatefunction}
        value={isprivate}
        style={{ display:userid!==auth.currentUser.uid?"none":"flex",transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
      />
  </View>
  <View style={{margin:RFPercentage(1.7),paddingVertical:RFPercentage(2),paddingHorizontal:RFPercentage(5),backgroundColor:colors.grey1,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
,borderRadius:RFPercentage(1.5)
}}>
    <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={()=>navigation.navigate("follower",{list:followers?.followers})}>
        <Text style={{marginRight:RFPercentage(1.2)}}>{followers?.followers.length}</Text>
        <Text style={{color:colors.grey2}}>Follower</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={()=>navigation.navigate("following",{list:following?.followings})}>
        <Text style={{marginRight:RFPercentage(1.2)}}>{following?.followings.length}</Text>
        <Text style={{color:colors.grey2}}>Following</Text>
    </TouchableOpacity>
</View>
<View style={{marginHorizontal:RFPercentage(1.7),
paddingVertical:RFPercentage(2),paddingHorizontal:RFPercentage(5),
backgroundColor:colors.lightprimary,display:"flex",
justifyContent:"center",alignItems:"center"
,borderRadius:RFPercentage(1.5)
}}>
    <View style={{display:"flex",flexDirection:"row"}}>
        <Text style={{marginRight:RFPercentage(1.2),color:colors.primary}}>{posts?.length}</Text>
        <Text style={{color:colors.primary}}>Shots</Text>
    </View>
</View>
</View>
<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
    <View style={{display:"flex",flexDirection:"row"
    ,flexWrap:"wrap",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.2)}}>
 {
    userid!==auth.currentUser.uid&&accountdetail?.ispublic===false?
    <Text>Private Account nothing to show</Text>
    :
    posts?.map((item,i)=>(
        item.data.vdeo===true?
        <Video
        ref={video}
        style={{minHeight:RFPercentage(20),minWidth:RFPercentage(20),margin:RFPercentage(.5),borderRadius:RFPercentage(1.5)}}
        source={{
          uri: item.data.post,
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      :
      <ImageBackground key={i} source={{uri:item.data.post}}
      resizeMode="cover"
      style={{minHeight:RFPercentage(20),minWidth:RFPercentage(20),margin:RFPercentage(.5)}}
      imageStyle={{
          borderRadius:RFPercentage(1.5)
      }}
      />
    ))
    
 }
    </View>
</ScrollView>
<BottomNavigation navigation={navigation}></BottomNavigation>
</View>
  )
}
}