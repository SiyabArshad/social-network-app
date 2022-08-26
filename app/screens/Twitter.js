import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
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

export default function Twitter({navigation}) {
    const auth=getAuth(app)
    const db=getFirestore(app)
    const {colors}=useTheme()
    const[topnav,settopnav]=React.useState("all")
    const[tweets,settweets]=React.useState([])
    const[ftweets,setftweets]=React.useState([])
    const[all,setall]=React.useState([])
    const[likes,setlikes]=React.useState([])
    const[shares,setshares]=React.useState([])
    const[comments,setcomments]=React.useState([])
    const [loading,setloading]=React.useState(false)
    const gettweetinfo=async()=>
    {
        setloading(true)
        //likes start
        getDocs(collection(db, "tweetlikes")).then((res)=>{
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
    getDocs(collection(db, "tweetshares")).then((res)=>{
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
 getDocs(collection(db, "tweetcomments")).then((res)=>{
  const quests=res.docs.map(doc=>({
      data:doc.data(),
      id:doc.id
        }))
   setcomments(quests)
   }).catch((e)=>{
      console.log(e)
  })
///comments end
            const docRef1=doc(db,"following",auth.currentUser.uid)
          const docSnap1=await getDoc(docRef1)
          const lists=docSnap1.data().followings
          let temprory=[]
          setTimeout(() => {
            lists.map((item,i)=>{              
            const qs=query(collection(db, "tweets"),where("userid","==",item.userid))
            getDocs(qs).then((res)=>{
                const quests1=res.docs.map(doc=>({
                    data:doc.data(),
                    id:doc.id
                  }))
                temprory.push(...quests1)
              }).catch(()=>{
               })          
              
            })
             setftweets(temprory) 
          }, 1000);
        const q=query(collection(db, "tweets"),orderBy('timestamp','desc'))
        getDocs(q).then((res)=>{
            const quests=res.docs.map(doc=>({
                data:doc.data(),
                id:doc.id
              }))
            setall(quests)
            settweets(quests)
            setTimeout(() => {
              setloading(false)
            }, 2000);
          }).catch(()=>{
              setloading(false)
          })

    }
    const controller=new AbortController()
    React.useEffect(()=>{
      gettweetinfo()
      return ()=>{
        controller.abort()
      }
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
        onPress={
            ()=>{
                settopnav('all')
                settweets(all)
        }
        }
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
            settweets(ftweets)
        }}
        >
            <Text
            style={{
                color:topnav==='followed'?colors.primary:colors.grey2
            }}
            >Followed</Text>
        </TouchableOpacity>
        </View>
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
    tweets?.map((item,i)=>(
        <Tweet key={i} details={item} commentsinfo={comments?.filter((ite)=>ite.id===item.id)} likesinfo={likes?.filter((ite)=>ite.id===item.id)} sharesinfo={shares?.filter((ite)=>ite.id===item.id)}  authuser={auth.currentUser.uid} navigation={navigation}  />
    ))
   }
    </ScrollView>
    <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  )
}
}
