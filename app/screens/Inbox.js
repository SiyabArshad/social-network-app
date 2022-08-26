import { View,StyleSheet,Image,TouchableOpacity,FlatList,Pressable,SafeAreaView,Text } from 'react-native'
import * as React from 'react'
import {RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons, Feather } from '@expo/vector-icons';
import { GiftedChat,Bubble,InputToolbar } from 'react-native-gifted-chat';
import { doc, setDoc,getFirestore,query,onSnapshot,orderBy,collection,addDoc,getDocs,getDoc,updateDoc,serverTimestamp  } from "firebase/firestore"; 
import {getAuth} from "firebase/auth"
import app from '../../firebase'
import sendPushNotification from '../configurations/notificationalerts'

export default function Chat({navigation,route}) {
    const {colors}=useTheme()
    const chatuser=route.params.chatuser
    const auth=getAuth(app)
    const db=getFirestore(app)
    const [messages, setMessages] = React.useState([]);
    const [indicator,showindicator]=React.useState(false)
    React.useEffect(() => {
      const docid  = chatuser.userid > auth.currentUser.uid ? auth.currentUser.uid+ "-" + chatuser.userid : chatuser.userid+"-"+auth.currentUser.uid 
const messageref=collection(db,"chatrooms",docid,"messages")
const messagesQuery = query(messageref, orderBy('createdAt',"desc"));  
const unsubscribe=onSnapshot(messagesQuery, (snapshot) => {
    const allmsg=snapshot.docs.map((doc) =>{
        const data=doc.data()
        if(data.createdAt){
            return {
               ...doc.data(),
               createdAt:doc.data().createdAt.toDate()
           }
        }else {
           return {
               ...doc.data(),
               createdAt:new Date()
           }
        }
    }
 )
 setMessages(allmsg)
})

        return ()=>{
          unsubscribe()
        }

        
      }, [])

      const onSend =(messageArray) => {
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            sentBy:auth.currentUser.uid,
            sentTo:chatuser.userid,
            createdAt:new Date()
        }
       setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))
       const docid  = chatuser.userid > auth.currentUser.uid ? auth.currentUser.uid+ "-" + chatuser.userid : chatuser.userid+"-"+auth.currentUser.uid 
       const messageref=collection(db,"chatrooms",docid,"messages") 
       addDoc(messageref,{...mymsg,createdAt:serverTimestamp()}).then(()=>{
        let stringnotify=chatuser?.username+" "+"message you"
        sendPushNotification(chatuser?.token,stringnotify)
        
        }).catch(()=>{

        })
      }
      if(indicator)
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
        <View style={{ flex: 1,backgroundColor: colors.white,paddingTop:RFPercentage(3) }}>
        <View style={{padding:RFPercentage(2)}}>
        <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.navigate("home")}>
        <AntDesign name="back" size={30} color={colors.black} />
        </TouchableOpacity>
            <Text style={{fontSize:RFPercentage(2.5)}}>{chatuser.username}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("profile",{userid:chatuser.userid})}>
            <Image
                source={{uri:chatuser?.profile}}
                style={{height:RFPercentage(7),width:RFPercentage(7),borderRadius:RFPercentage(3.5)}}
                />
        </TouchableOpacity>
        </View>
        </View>
        <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: auth.currentUser.uid,
                }}
                renderBubble={(props)=>{
                    return <Bubble
                    {...props}
                    wrapperStyle={{
                      right: {
                        backgroundColor:colors.primary,
                      }
                      
                    }}
                  />
                }}

                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                     containerStyle={{borderTopWidth: 1.5, borderTopColor: colors.primary}} 
                     textInputStyle={{ color: "black" }}
                     />
                }}
                
                />
    
    </View>
  )
              }
}