import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Stories from '../components/Stories'
import Post from '../components/Post'
import { AntDesign,Entypo,EvilIcons,FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, getDocs,collection,getDoc,serverTimestamp, updateDoc,query,where,orderBy,limit, startAt} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useIsFocused } from "@react-navigation/native";

export default function Home({navigation}) {
    const isFocused = useIsFocused();  
    const auth=getAuth(app)
    const db=getFirestore(app)
    const {colors}=useTheme()
    const[search,setsearch]=React.useState("")
    const[topnav,settopnav]=React.useState("all")
    const [users,setusers]=React.useState([])
    const [tempusers,settempusers]=React.useState([])
    const [following,setfollowing]=React.useState(null)
    const [loading,setloading]=React.useState(false)
    const [storyinfo,setstoryinfo]=React.useState([])
    const[posts,setposts]=React.useState([])
    const[fposts,setfposts]=React.useState([])
    const[all,setall]=React.useState([])
    const[likes,setlikes]=React.useState([])
    const[shares,setshares]=React.useState([])
    const[comments,setcomments]=React.useState([])
    //notifications starts
    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
          alert('Must use physical device for Push Notifications');
        }
      if(token)
      {
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          token
        },{merge:true});
        
      }
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }
    //ends notifications
    const searchfunction=async(value)=>{
        setsearch(value)
        if(value==="")
        {
            setusers(tempusers)
        }
        else
        {
            setusers(users.filter((item)=>item.username.toLowerCase().includes(value.toLowerCase())))
        }
       
    }
    
    const postinfo=async()=>{
      getDocs(collection(db, "postlikes")).then((res)=>{
        const quests=res.docs.map(doc=>({
            data:doc.data(),
            id:doc.id
          }))
        setlikes(quests)
      }).catch((e)=>{
      console.log(e)
      })
///likes end
//share start
getDocs(collection(db, "postshares")).then((res)=>{
const quests=res.docs.map(doc=>({
    data:doc.data(),
    id:doc.id
      }))
 setshares(quests)
 }).catch((e)=>{
    console.log(e)
})
///share end
 //comments start
 getDocs(collection(db, "postcomments")).then((res)=>{
  const quests=res.docs.map(doc=>({
      data:doc.data(),
      id:doc.id
        }))
   setcomments(quests)
   }).catch((e)=>{
      console.log(e)
  })
///comments end

    }

    const getuserinfo=async()=>{
        setloading(true)
        postinfo()
          const docRef1=doc(db,"following",auth.currentUser.uid)
          const docSnap1=await getDoc(docRef1)
          const lists=docSnap1.data().followings
          setfollowing(docSnap1.data())
          let temprory=[]
          setTimeout(() => {
            lists.map(async(item,i)=>{ 
              const docRef = doc(db,"stories",item.userid)
              const docSnap = await getDoc(docRef);
              if(docSnap.exists())
              {
                  temprory.push(docSnap.data())
              }
              
            })
            setstoryinfo(temprory)  
          }, 1000);

          let temproryposts=[]
          setTimeout(() => {
            lists.map((item,i)=>{              
            const qs=query(collection(db, "posts"),where("userid","==",item.userid))
            getDocs(qs).then((res)=>{
                const quests1=res.docs.map(doc=>({
                    data:doc.data(),
                    id:doc.id
                  }))
                temproryposts.push(...quests1)
              }).catch(()=>{
               })          
              
            })
             setfposts(temproryposts) 
          }, 1000);

               
       setTimeout(() => {
        getDocs(collection(db, "users")).then((res)=>{
          const quests=res.docs.map(doc=>doc.data())
          setusers(quests)
          settempusers(quests)
          setTimeout(() => {
            setloading(false)
          }, 2000);
        }).catch(()=>{
            setloading(false)
        })
       }, 1000);

       const q=query(collection(db, "posts"),orderBy('timestamp','desc'))
        getDocs(q).then((res)=>{
            const quests=res.docs.map(doc=>({
                data:doc.data(),
                id:doc.id
              }))
            setall(quests)
            setposts(quests)
            setTimeout(() => {
              setloading(false)
            }, 2000);
          }).catch(()=>{
              setloading(false)
          })

    }
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
  React.useEffect(()=>{
    (()=>registerForPushNotificationsAsync())()
  },[])

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
        justifyContent:"space-between",
        paddingTop:RFPercentage(3.5)
    }}
    >
    <View
    style={{
        padding:RFPercentage(2)
    }}
    >
     <View
     style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:"space-between"

     }}
     >
        <TextInput
        placeholder='Search'
        style={{
            width:"85%",
            backgroundColor:colors.lightprimary,
            borderRadius:RFPercentage(4),
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(2)
        }}
        onChangeText={(e)=>searchfunction(e)}
            value={search}
        ></TextInput>
        <TouchableOpacity
        style={{
            backgroundColor:colors.lightprimary,
            borderRadius:RFPercentage(3),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:RFPercentage(6),
            height:RFPercentage(6),
            paddingHorizontal:RFPercentage(1),
            paddingVertical:RFPercentage(1)
        }}
        onPress={()=>navigation.navigate("contacts",{list:following?.followings})}
        >
            <EvilIcons name="sc-telegram" size={30} color={colors.primary} />
        </TouchableOpacity>
     </View>
     
   {/**search results */}
    <ScrollView style={{display:search===""?"none":"flex",height:"100%",marginTop:RFPercentage(1.3),width:"100%"}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
                {
                    users?.map((item,i)=>(
                <TouchableOpacity key={i} style={{
                    padding:RFPercentage(1.5),
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center",
                    backgroundColor:colors.lightprimary,
                    marginHorizontal:RFPercentage(1),
                    marginVertical:RFPercentage(.4),
                    borderRadius:RFPercentage(1.7),
                    shadowColor:colors.primary,
                    shadowOpacity:0.9,
                    shadowRadius:RFPercentage(.4),
                    elevation:5,
                    shadowOffset:{width:0,height:1},
                }}
                onPress={()=>navigation.navigate("profile",{userid:item.userid})}
                >
                    <Image
                    resizeMode='cover'
                    source={item.profile?{uri:item.profile}:require("../../assets/profile.jpeg")} style={{
                        width:RFPercentage(10),
                        height:RFPercentage(10),
                        borderRadius:RFPercentage(5),
                        marginRight:RFPercentage(2)
                    }}>
                    </Image>
                    <View>
                    <Text style={{color:colors.grey2,textAlign:"center"}}>{item.username}</Text>
                    <Text style={{color:colors.grey2,textAlign:"center",fontWeight:"300"}}>{item.email}</Text>
                    </View>
                    <View>
                    <Text style={{color:colors.grey2,textAlign:"center",fontWeight:"200"}}>User</Text>
                    </View>
                </TouchableOpacity>
 ))
}
          </ScrollView>    

          {/**end search results */}

        <View style={{
            display:"flex",
            flexDirection:"row",
            paddingVertical:RFPercentage(1.1),
            
        }}>
        <TouchableOpacity
        style={{
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(1.5),
            backgroundColor:topnav==='all'?colors.lightprimary:colors.grey1,
            borderRadius:RFPercentage(3),
            marginRight:RFPercentage(1.5)
        }}
        onPress={()=>{
          settopnav('all')
          setposts(all)
             }}
     >
            <Text
            style={{
                color:topnav==='all'?colors.primary:colors.grey2
            }}
            >ALL</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(1.5),
            backgroundColor:topnav==='followed'?colors.lightprimary:colors.grey1,
            borderRadius:RFPercentage(3),
            marginRight:RFPercentage(1.5)
        }}
        onPress={()=>{
          settopnav('followed')
          setposts(fposts)
             }}
        >
            <Text
            style={{
                color:topnav==='followed'?colors.primary:colors.grey2
            }}
            >Followed</Text>
        </TouchableOpacity>
        </View>
        <Stories stories={storyinfo} navigation={navigation}></Stories>
    </View>
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
   horizontal={false}
   style={{
    paddingHorizontal:RFPercentage(2)
   }}
   > 
   {
    posts.map((item,i)=>(
        <Post key={i} details={item} commentsinfo={comments?.filter((ite)=>ite.id===item.id)} likesinfo={likes?.filter((ite)=>ite.id===item.id)} sharesinfo={shares?.filter((ite)=>ite.id===item.id)} authuser={auth.currentUser.uid} navigation={navigation}></Post>
    ))
   }
    </ScrollView>
    <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  )
}
}
