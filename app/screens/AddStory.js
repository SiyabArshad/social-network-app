import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { Video, AVPlaybackStatus } from 'expo-av';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc,updateDoc,getDoc,serverTimestamp, collection} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes,uploadBytesResumable  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {loginuser,logoutuser,updateuser} from "../redux/action"
import { async } from '@firebase/util'

export default function AddStory({navigation}) {
    const auth=getAuth(app)
    const db=getFirestore(app)
    const storage=getStorage(app)
    const[content,setcontent]=React.useState("")
    const {colors}=useTheme()
    const [loading,setloading]=React.useState(false)
    const userinfo = useSelector(state => state.Reducers.user);
 

      const uploaddocument=async(downloadURL)=>{
        try{
        await setDoc(doc(db,"stories",auth.currentUser.uid),{
          story:downloadURL,
          timestamp:serverTimestamp(),
          userid:auth.currentUser.uid,
          profile:userinfo.profile
        })
        }
        catch(e)
        {
          console.log(e.message)
        }
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
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
              }
        );
        if (!result.cancelled) {
          setcontent(result.uri);
        }
      }
    //end images video pickers
    
    const uploadstory=async()=>{
      setloading(true)
        if(content===""||content===null||content==="")
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
      const storageRef = ref(storage, `stories/${auth.currentUser.email+new Date().toLocaleTimeString()}`);
      const img = await fetch(content);
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
      uploaddocument(downloadURL)
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
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("addcontent")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",textTransform:"capitalize"
        }}>
          Add Story
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
    <ImageBackground 
   resizeMode='contain'
   style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),
    display:content===''||content===undefined||content===null?"none":"flex"
}}
   source={{ uri: content?content:""}}
   />

        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
                <TouchableOpacity onPress={showImagePicker}>
                <Entypo name="camera" size={40} color={colors.primary} />
                </TouchableOpacity>
        <TouchableOpacity
        onPress={uploadstory}
        style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:content===''||content===undefined||content===null?"none":"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),flexDirection:"row"
    }}>
               <Feather name="upload" size={24} color={colors.white} />
               <Text style={{color:colors.white,fontSize:RFPercentage(2.8),marginLeft:RFPercentage(1)}}>Story</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </SafeAreaView>
  )
}
}