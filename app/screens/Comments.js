import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,Keyboard,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import {doc,setDoc,getFirestore, addDoc, getDocs,collection,getDoc,serverTimestamp, updateDoc,query,where,orderBy,limit, startAt} from "firebase/firestore"
import Toast from 'react-native-root-toast'
import app from "../../firebase"
import sendPushNotification from '../configurations/notificationalerts'
import { useSelector,useDispatch } from 'react-redux';
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import moment from "moment"

export default function Comments({navigation,route}) {
    const db=getFirestore(app)
    const {cmts,owner,dbname}=route.params
    const auth=getAuth(app)
    const{colors}=useTheme()
    const[replybox,setreplybox]=React.useState(false)
    const[comment,setcomment]=React.useState('')
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const [loading,setloading]=React.useState(false)
    const userinfo = useSelector(state => state.Reducers.user);
    const [commetsinfo,setcommentinfo]=React.useState(null)
    const [updated,setupdated]=React.useState(false)
    const [replyid,setreplyid]=React.useState(null)
    const replyfunction=async()=>{
    if(comment!=='')
    {
      setloading(true)
        //changes in cmts.id
        //comment saved in atemp variable comment can get through commentinfo.comment.filter
        //another variable replies save all replies 
        //push in replies//newone
        //metadata of new comment
        //commentid:auth.currentuser.uid
        //comment:......
        // replies:[]
        //timestamp:....
        //userinfo
        let data=[]
        let repl=[]
        data=commetsinfo.comments.filter((item)=>item.commentid===replyid)
        repl=data[0].replies
        let newcomment={
          replyid:auth.currentUser.uid,
          desc:comment,
          userinfo:userinfo,
          timestamp:new Date().toUTCString()
        }
        repl.push(newcomment)
        data[0].replies=repl
        const docRef=doc(db,dbname,cmts.id)
        await updateDoc(docRef,{
          comments:data
        })
        sendPushNotification(owner.token,`${userinfo.username} replied`)
        setupdated(true)
        
        setloading(false)
    }
    else
    {
      return
    }
 }
 
 const commentfunction=async()=>{
  setloading(true)
  //check comment is not already exists
  //condition here commentsinfo.comments.filter(inside authid===item.commentid)
  const comentexist=commetsinfo?.comments.filter((item)=>item?.commentid===auth.currentUser.uid)
  if(comment!==''&&comentexist.length===0)
    {
        //changes in cmts.id
        //push in commentsinfo.comments//newone
        //metadata of new comment
        //commentid:auth.currentuser.uid
        //comment:......
        // replies:[]
        //timestamp:....
        //userinfo
        let data=[]
        data=commetsinfo.comments
        let newcomment={
          commentid:auth.currentUser.uid,
          desc:comment,
          userinfo:userinfo,
          replies:[],
          timestamp:new Date().toUTCString()
        }
        data.push(newcomment)
        const docRef=doc(db,dbname,cmts.id)
        await updateDoc(docRef,{
          comments:data
        })
        sendPushNotification(owner.token,`${userinfo.username} commented`)
        setupdated(true)
        setloading(false)
    }
    else
    {
      setloading(false)
      return
    }
}
const getcomentinfo=async()=>{
  setloading(true)
  const docRef = doc(db,dbname,cmts.id);
    const docSnap=await getDoc(docRef)
    setcommentinfo(docSnap.data())
  setloading(false)
}
const controller=new AbortController()
React.useEffect(()=>{
  getcomentinfo()
    return()=>{
      controller.abort()
    }
},[])
React.useEffect(()=>{
  getcomentinfo()
    return()=>{
      controller.abort()
    }
},[updated])
 React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
    let desc="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content." 
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
        <SafeAreaView style={{flex:1,backgroundColor:colors.white,paddingTop:Platform.OS==='android'?RFPercentage(5):0}}> 
            <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible?RFPercentage(2):0}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{paddingHorizontal:RFPercentage(2),display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={{color:colors.primary,fontSize:RFPercentage(2)}}>Comments</Text>
            </View>
            <View style={{height:"100%",display:"flex",justifyContent:"flex-end"}}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} 
            horizontal={false}
            >
                
             <View style={{padding:RFPercentage(1.6)}}>
                {
                  commetsinfo?.comments.map((item,i)=>{
                    return(
                <>             
                <View key={i} style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{display:"flex",flexDirection:"row",width:"80%"}}>
                <Image style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3),
                    marginRight:RFPercentage(1.5)
                    }} source={{uri:item?.userinfo.profile}}></Image>
                <View>
                <Text style={{color:colors.back,fontWeight:"bold"}}>{item?.userinfo.username}</Text>
                <Text style={{color:colors.black,fontWeight:"300",textAlign:"justify"}}>{item?.desc}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:colors.black}}>{moment(item?.timestamp).fromNow()}</Text>
                </View>
                </View>
                <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <TouchableOpacity onPress={()=>{
                      setreplybox(!replybox)
                      setreplyid(item?.commentid)
                      }}>
                    <Entypo name="reply" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{display:item?.replies.length==0?"none":"flex",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity><Text style={{color:colors.primary}}>Replies</Text></TouchableOpacity>      
                </View>
                 {
                    item?.replies.map((ite)=>(
                      <View style={{marginLeft:RFPercentage(5),display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                      <View style={{display:"flex",flexDirection:"row",width:"80%"}}>
                      <Image style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3),
                          marginRight:RFPercentage(1.5)
                          }} source={{uri:ite?.userinfo.profile}}></Image>
                      <View>
                      <Text style={{color:colors.back,fontWeight:"bold"}}>{ite?.userinfo.username}</Text>
                      <Text style={{color:colors.black,fontWeight:"300",textAlign:"justify"}}>{ite?.desc}</Text>
                      </View>
                      </View>
                      <View>
                          <Text style={{color:colors.black}}>{moment(ite?.timestamp).fromNow()}</Text>
                      </View>
                      </View>
                    ))
                }
             
                </>
                 

             )
                  })
                }
                {/**reply design */}
             
               
                {/**reply design end */}
                     </View>
            </ScrollView>
            {
              replybox?
              <View style={{margin:RFPercentage(2),display:"flex",flexDirection:"row"
                     ,justifyContent:"space-between"
                     ,borderRadius:RFPercentage(1.5),
                     borderColor:colors.primary,
                     borderWidth:RFPercentage(.1),
                     paddingHorizontal:RFPercentage(1),
                     paddingVertical:RFPercentage(1.2)
                     
                     }}>
                        <TextInput
                        onChangeText={(e)=>setcomment(e)}
                        value={comment}
                        style={{
                        width:"90%",
                    }} placeholder='Reply'
                    >
                    </TextInput>
                    <TouchableOpacity
                    onPress={replyfunction}
                    style={{
                        display:"flex",justifyContent:"center",
                        alignItems:"center"
                    }}
                    ><Text style={{color:colors.primary}}>Reply</Text></TouchableOpacity>
                </View>
                :
          <View style={{margin:RFPercentage(2),display:"flex",flexDirection:"row"
                     ,justifyContent:"space-between"
                     ,borderRadius:RFPercentage(1.5),
                     borderColor:colors.primary,
                     borderWidth:RFPercentage(.1),
                     paddingHorizontal:RFPercentage(1),
                     paddingVertical:RFPercentage(1.2)
                     
                     }}>
                        <TextInput
                        onChangeText={(e)=>setcomment(e)}
                        value={comment}
                        style={{
                        width:"90%",
                    }} placeholder='comment'
                    >
                    </TextInput>
                    <TouchableOpacity
                    onPress={commentfunction}
                    style={{
                        display:"flex",justifyContent:"center",
                        alignItems:"center"
                    }}
                    ><Text style={{color:colors.primary}}>Post</Text></TouchableOpacity>
                </View>
            
            }
                     </View>
                     </KeyboardAvoidingView>
       </SafeAreaView>
   
  )
}
}