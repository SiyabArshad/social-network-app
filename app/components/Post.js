import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';
import moment from "moment"
import deleterecordfunction from '../configurations/deleterecord';
import reportuserfunction from '../configurations/report';
import {doc,setDoc,getFirestore, addDoc, getDocs,collection,getDoc,serverTimestamp, updateDoc,query,where,orderBy,limit, startAt} from "firebase/firestore"
import Toast from 'react-native-root-toast'
import app from "../../firebase"
import sendPushNotification from '../configurations/notificationalerts'
import { useSelector,useDispatch } from 'react-redux';

export default function Post({navigation,details,authuser,likesinfo,sharesinfo,commentsinfo}) {
    const{colors}=useTheme()
    const db=getFirestore(app)
    const [readmore,setreadmore]=React.useState(true)
    const [isvdeo,setisvideo]=React.useState(false)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    let desc=details?.data.desc
    const [loading,setloading]=React.useState(false)
    const [likescount,setlikescount]=React.useState(likesinfo[0]?.data.likes.length)
    const [sharecount,setsharecount]=React.useState(sharesinfo[0]?.data.shares.length)
    const userinfo = useSelector(state => state.Reducers.user);
    

    const addsharefunction=async()=>{
        setloading(true)
        let shs=[]
        shs=sharesinfo[0].data.shares
        shs.push(authuser)
        await updateDoc(doc(db,"postshares",sharesinfo[0].id),{
                shares:shs
            })
        sendPushNotification(details?.data.userinfo.token,`${userinfo.username} shared your post`)
        setsharecount(sharecount+1)
        let toast = Toast.show("shared", {
            duration: Toast.durations.LONG,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 1000);
        setloading(false)
}

const addlikefunction=async()=>{
    setloading(true)
    const docRef = doc(db, "postlikes", likesinfo[0]?.id);
    const docSnap = await getDoc(docRef);
    let userlikes=[]
    userlikes=docSnap.data().likes
    let already=userlikes.filter((item)=>item===authuser)
    if(already.length>0)
    {
        let toast = Toast.show("Already liked", {
            duration: Toast.durations.LONG,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 1000);
        setloading(false)
        return
    }
    else
    {
    let lks=[]
    lks=likesinfo[0].data.likes
    lks.push(authuser)
    await updateDoc(doc(db,"postlikes",likesinfo[0].id),{
            likes:lks
        })
    sendPushNotification(details?.data.userinfo.token,`${userinfo.username} liked your post`)    
    setlikescount(likescount+1)
    let toast = Toast.show("like added", {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1000);
    setloading(false)
    }
}

    const deletefunc=()=>{
        setloading(true)
        deleterecordfunction("posts",details?.id)
        deleterecordfunction("postlikes",details?.id)
        deleterecordfunction("postcomments",details?.id)
        deleterecordfunction("postshares",details?.id)
        setTimeout(() => {
            setloading(false)
            alert("Post has been deleted")
            navigation.navigate("home")
        }, 1000);
    }
    const reportfunc=()=>{
        setloading(true)
        reportuserfunction(details?.data.userid)
        setTimeout(() => {
            setloading(false)
            alert(`Thanks for using report feature and helping us to clean the comunity we will monitor activity
            of ${details?.data.userinfo.username} and take action against him.
            `)
            navigation.navigate("home")
        }, 1000);
    }
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
            marginBottom:RFPercentage(2),
            elevation:2
        }}
        >
     {   
     details?.data.vdeo?
     <>
         <View
        style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            marginBottom:RFPercentage(1)
        }}
        >
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
             <TouchableOpacity onPress={()=>navigation.navigate("profile",{userid:details?.data.userid})}>   
            <Image
            style={{
                width:RFPercentage(6),
                height:RFPercentage(6),
                borderRadius:RFPercentage(3),
                marginRight:RFPercentage(2)
            }}
            source={{uri:details?.data.userinfo.profile?details?.data.userinfo.profile:""}}
            />
            </TouchableOpacity>
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey2
            }}
            >{details?.data.userinfo.username}</Text>
            </View>
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey2
            }}
            >{moment(new Date(details?.data.timestamp.toDate().toUTCString())).fromNow()}</Text>
            </View>
            
        </View>
     <Video
     ref={video}
      style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),    
    }}
     source={{
       uri: details?.data.post,
     }}
     useNativeControls
     resizeMode="cover"
     isLooping
     onPlaybackStatusUpdate={status => setStatus(() => status)}
   />
   </>
   :
   <ImageBackground 
   resizeMode='cover'
   style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),
    
}}
   source={{uri:details?.data.post}}
   >
        <View
        style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between"
        }}
        >
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
    <TouchableOpacity onPress={()=>navigation.navigate("profile",{userid:details?.data.userid})}>
            <Image
            style={{
                width:RFPercentage(6),
                height:RFPercentage(6),
                borderRadius:RFPercentage(3),
                marginRight:RFPercentage(2)
            }}
            source={{uri:details?.data.userinfo.profile?details?.data.userinfo.profile:""}}
            />
       </TouchableOpacity>     
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey1
            }}
            >{details?.data.userinfo.username}</Text>
            </View>
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey1
            }}
            >{moment(new Date(details?.data.timestamp.toDate().toUTCString())).fromNow()}</Text>
            </View>
            
        </View>
   </ImageBackground>
}
   <View style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:RFPercentage(2),
    paddingHorizontal:RFPercentage(1)
   }}>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity onPress={addlikefunction} style={{marginRight:RFPercentage(.5)}}>
    <AntDesign  name={"hearto"} size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate("comments",{cmts:commentsinfo[0],owner:details?.data.userinfo,dbname:"postcomments"})} style={{marginRight:RFPercentage(.5)}}>
    <FontAwesome5  name="comment" size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity onPress={addsharefunction}>
    <AntDesign name="sharealt" size={22} color={colors.primary} />
    </TouchableOpacity>
    </View>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity onPress={reportfunc} style={{marginRight:RFPercentage(.5)}}>
    <MaterialIcons name="report-problem" size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity onPress={deletefunc} style={{display:details.data.userid!==authuser?"none":"flex"}}>
    <Feather name="delete" size={22} color={colors.primary} />
    </TouchableOpacity>
    </View>
   </View>
   <Text style={{margin:RFPercentage(1),color:colors.grey2,fontSize:RFPercentage(1.7),fontWeight:"200"}}>{likescount} likes {commentsinfo[0]?.data.comments.length} comments {sharecount} shares</Text>
   <View style={{
    paddingHorizontal:RFPercentage(1)
   }}>
    <Text
    style={{
        color:colors.grey2,
        textAlign:"justify"
    }}
    >{ readmore?desc.slice(0,50):desc.slice(0,desc.length)}</Text>
    <TouchableOpacity
     onPress={()=>{
        setreadmore(!readmore)
     }}
    >
   <Text 
   style={{
    color:colors.primary
   }}
   >{readmore?"readmore":"showless"}</Text>
  </TouchableOpacity>
   </View>
   </View>
  )
}
}