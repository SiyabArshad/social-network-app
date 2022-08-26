import { View, KeyboardAvoidingView,Keyboard,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,updateDoc,getDocs,serverTimestamp, collection} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes,uploadBytesResumable  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {loginuser,logoutuser,updateuser} from "../redux/action"
import sendPushNotification from '../configurations/notificationalerts'
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTweet({navigation}) {
  const auth=getAuth(app)
    const db=getFirestore(app)
     const [loading,setloading]=React.useState(false)
    const[tweet,settweet]=React.useState("")
    const {colors}=useTheme()
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [items, setItems] = React.useState([
    {label: 'Tag', value: ''}
  ]);
  const userinfo = useSelector(state => state.Reducers.user);
  
    const getuserinfo=async()=>{
      setloading(true) 
     setTimeout(() => {
      getDocs(collection(db, "users")).then((res)=>{
        const quests=res.docs.map(doc=>doc.data())
        let temptags=[]
        quests.map((item,i)=>{
          let cont={
            label:item.username,
            value:item
          }
          temptags.push(cont)
        })
        setItems(temptags)
        setTimeout(() => {
          setloading(false)
        }, 2000);
      }).catch(()=>{
          setloading(false)
      })
     }, 1000);

  }
  
  const uploadfleet=async()=>{
    setloading(true)
    try{
      const docinfo= await addDoc(collection(db,"tweets"),{
        userid:auth.currentUser.uid,
        userinfo:userinfo,
        tweet:tweet,
        tags:value,
        timestamp:serverTimestamp()
      })
      await setDoc(doc(db,"tweetlikes",docinfo.id),{
        tweetid:docinfo.id,
        likes:[],
        timestamp:serverTimestamp()
      })
      await setDoc(doc(db,"tweetcomments",docinfo.id),{
        tweetid:docinfo.id,
        comments:[],
        timestamp:serverTimestamp()
      })
      await setDoc(doc(db,"tweetshares",docinfo.id),{
        tweetid:docinfo.id,
        shares:[],
        timestamp:serverTimestamp()
      })
    value.map((item,i)=>{
      let data=`${userinfo.username} tag you in his fleet`
      sendPushNotification(item.token,data)
    })
    let toast = Toast.show('Uploaded', {
      duration: Toast.durations.LONG,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 1000);
    setloading(false)
  }
    catch{
      let toast = Toast.show('Upload Failed', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1000);
      setloading(false)
    }
  }
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
     const controller=new AbortController()
     React.useEffect(()=>{
      getuserinfo()
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
        <SafeAreaView style={{flex:1}}>
                 <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible?RFPercentage(2):0}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("addcontent")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",marginBottom:RFPercentage(2),textTransform:"capitalize"
        }}>
          Add Fleet
        </Text>    
        <View style={{width:"90%",marginHorizontal:"5%",display:"flex",zIndex:999,justifyContent:"center",alignItems:"center"}}>
        <DropDownPicker
        placeholder='Tag users'
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{borderColor:colors.primary}}
        multiple={true}
        mode="BADGE"
        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
      />
      </View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
          
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
                <View 
                 style={{
                    backgroundColor:colors.lightprimary,
                   width:"90%",
                   marginVertical:RFPercentage(2),
                   padding:RFPercentage(2),
                   borderRadius:RFPercentage(2),
                   minHeight:RFPercentage(30),
                   shadowColor: colors.primary,
                   shadowOffset: { width: 0, height: 1 },
                   shadowOpacity: 0.8,
                   shadowRadius: 2,  
                   elevation: 5
                    }}
                >     
                     <TextInput onChangeText={(e)=>settweet(e)} autoFocus={true} placeholder='Fleet' value={tweet} placeholderTextColor={colors.primary} style={{fontSize:RFPercentage(2.5),color:colors.primary}} multiline/>
        </View>
      
        </View>
        </ScrollView>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={uploadfleet} style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),
        flexDirection:"row"
    }}>
            <EvilIcons name="sc-telegram" size={30} color={colors.white} />
        <Text style={{color:colors.white,fontSize:RFPercentage(2.8)}}>Fleet</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        
        </SafeAreaView>
  )
}
}