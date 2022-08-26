import { View, KeyboardAvoidingView,Keyboard,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { Video, AVPlaybackStatus } from 'expo-av';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,updateDoc,getDocs,serverTimestamp, collection} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes,uploadBytesResumable  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {loginuser,logoutuser,updateuser} from "../redux/action"
import sendPushNotification from '../configurations/notificationalerts'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Addpost({navigation}) {
  const auth=getAuth(app)
  const db=getFirestore(app)
  const storage=getStorage(app)
   const [loading,setloading]=React.useState(false)
    const[desc,setdesc]=React.useState("")
    const[content,setcontent]=React.useState("")
    const [isvdeo,setisvideo]=React.useState(false)
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const {colors}=useTheme()
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
    //images video picker code
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this appp to access your photos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync(
            {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
              }
        );
        if (!result.cancelled) {
          setcontent(result);
        }
      }
    //end images video pickers
    const uploadpost=async(url)=>{
      try{
        const docinfo=await addDoc(collection(db,"posts"),{
          userid:auth.currentUser.uid,
          userinfo:userinfo,
          post:url,
          vdeo:content?.type==='video'?true:false,
          desc:desc,
          tags:value,
          timestamp:serverTimestamp()
        })
        await setDoc(doc(db,"postlikes",docinfo.id),{
          postid:docinfo.id,
          likes:[],
          timestamp:serverTimestamp()
        })
        await setDoc(doc(db,"postcomments",docinfo.id),{
          postid:docinfo.id,
          comments:[],
          timestamp:serverTimestamp()
        })
        await setDoc(doc(db,"postshares",docinfo.id),{
          postid:docinfo.id,
          shares:[],
          timestamp:serverTimestamp()
        })
      value.map((item,i)=>{
        let data=`${userinfo.username} tag you in his post`
        sendPushNotification(item.token,data)
      })
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


    const uploadfunction=async()=>{
      setloading(true)
        if(content===""||content===null||content===""||desc==="")
        {
          let toast = Toast.show("Details are missing", {
            duration: Toast.durations.LONG,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 1000);
          setloading(false)
          return false
        }
      const storageRef = ref(storage, `posts/${auth.currentUser.email+new Date().toLocaleTimeString()}`);
      const img = await fetch(content.uri);
      const bytes = await img.blob();

          //start
          const uploadTask = uploadBytesResumable(storageRef, bytes);

 // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',(snapshot) => {
   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   console.log('Upload is ' + progress + '% done');
   switch (snapshot.state) {
      case 'paused':
          console.log('Upload is paused');
      break;
      case 'running':
         console.log('Upload is running');
      break;
   }
},
(error) => {
   setloading(false)
   // A full list of error codes is available at
   // https://firebase.google.com/docs/storage/web/handle-errors
   switch (error.code) {
      case 'storage/unauthorized':
         console.log("User doesn't have permission to access the object");
      break;
      case 'storage/canceled':
         console.log("User canceled the upload");
      break;
      case 'storage/unknown':
         console.log("Unknown error occurred, inspect error.serverResponse");
      break;
   }
},
() => {
   // Upload completed successfully, now we can get the download URL
   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //perform your task
      uploadpost(downloadURL)
      let toast = Toast.show('Uploaded', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1000);
      setloading(false)
    }).catch((e)=>{
      console.log(e)
      let toast = Toast.show('Upload Failed', {
        duration: Toast.durations.LONG,
      });
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1000);
      setloading(false)
    })
    
});          //end   
    } 





    //start useeffects
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
            ,fontSize:RFPercentage(3),marginBottom:RFPercentage(2),fontWeight:"400",textTransform:"capitalize"
        }}>
          Add Post
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
        
        {   
     content?.type==='video'?
     <>
     <Video
     ref={video}
      style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),
    display:content===''||content===undefined||content===null?"none":"flex"    
}}
     source={{
       uri: content?.uri,
     }}
     useNativeControls
     resizeMode="contain"
     isLooping
     onPlaybackStatusUpdate={status => setStatus(() => status)}
   />
   </>
   :<ImageBackground 
   resizeMode='contain'
   style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),
    display:content===''||content===undefined||content===null?"none":"flex"
}}
   source={{ uri: content?.uri}}
   />
}

        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
                <TouchableOpacity onPress={showImagePicker}>
                <Entypo name="camera" size={40} color={colors.primary} />
                </TouchableOpacity>
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
                     <TextInput placeholder='Description' value={desc} onChangeText={(e)=>setdesc(e)} autoFocus={true} placeholderTextColor={colors.primary} style={{fontSize:RFPercentage(2.5),color:colors.primary}} multiline/>
           
        </View>

        </View>
        </ScrollView>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={uploadfunction} style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:content===''||content===undefined||content===null?"none":"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),flexDirection:"row"
    }}>
               <Feather name="upload" size={24} color={colors.white} />
               <Text style={{color:colors.white,fontSize:RFPercentage(2.8),marginLeft:RFPercentage(1)}}>Post</Text>
            </TouchableOpacity>
 </View>
        </KeyboardAvoidingView>
        </SafeAreaView>
  )
}
}