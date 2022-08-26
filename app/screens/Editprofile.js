//<Image style={{height:"100%",width:"100%"}} source={require("../../assets/profile.jpeg")}></Image>


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
import {doc,setDoc,getFirestore, addDoc, updateDoc,getDoc,serverTimestamp} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes,uploadBytesResumable  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {loginuser,logoutuser,updateuser} from "../redux/action"
import { CONSTANTS } from '@firebase/util'

export default function Editprofile({navigation}) {
  const auth=getAuth(app)
  const db=getFirestore(app)
  const storage=getStorage(app)
  const dispatch = useDispatch();  
  const [loading,setloading]=React.useState(false)
  const {colors}=useTheme()
  const [profile,setprofile]=React.useState(null)
  const [name,setname]=React.useState("")
  const [desc,setdesc]=React.useState("") 
  const userinfo = useSelector(state => state.Reducers.user);
  
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
        setprofile(result.uri)
          //  setcontent(result);
        }
      }
    //end images video pickers
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    
    const updateprofile=async()=>{
      setloading(true)
        if(profile===""||profile===null||name===""||desc==="")
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
      const storageRef = ref(storage, `users/${auth.currentUser.email+new Date().toLocaleTimeString()}`);
      const img = await fetch(profile);
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
      const upDocRef = doc(db, "users", auth.currentUser.uid);
      const docRef = updateDoc(upDocRef, 
        {
          username: name,
          desc: desc,
          profile: downloadURL
        }
        ).then(()=>{
          setTimeout(async() => {
            userinfo.profile=downloadURL
            userinfo.username=name
            userinfo.desc=desc
            await dispatch(updateuser(userinfo))
            let toast = Toast.show('Updated', {
              duration: Toast.durations.LONG,
            });
            setTimeout(function hideToast() {
              Toast.hide(toast);
            }, 1000);
  
            setloading(false)  
          }, 1000);
          
        }).catch((e)=>{
          console.log(e)
          setloading(false)
          let toast = Toast.show('Try again later', {
            duration: Toast.durations.LONG,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 1000);
        })
  
    });
});

          //end   
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
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("setting")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",textTransform:"capitalize"
        }}>
          Update Profile
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
        
      
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
                <TouchableOpacity style={{height:RFPercentage(15),width:RFPercentage(15)}} onPress={showImagePicker}>
               <Image style={{height:"100%",width:"100%",borderRadius:RFPercentage(7.5)}} source={!profile?require("../../assets/profile.jpeg"):{uri:profile}}></Image>
                </TouchableOpacity>
                <View 
                 style={{
                    backgroundColor:colors.lightprimary,
                   width:"90%",
                   marginTop:RFPercentage(2),
                   padding:RFPercentage(2),
                   borderRadius:RFPercentage(2),
                   shadowColor: colors.primary,
                   shadowOffset: { width: 0, height: 1 },
                   shadowOpacity: 0.8,
                   shadowRadius: 2,  
                   elevation: 5
                    }}
                >   
                  
                     <TextInput
                      onChangeText={(e)=>setname(e)}
                      value={name}
                      placeholder='name' autoFocus={true} placeholderTextColor={colors.primary} 
                      style={{fontSize:RFPercentage(2.5),color:colors.primary}} 
                      />
           
        </View> 
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
                     <TextInput
                      onChangeText={(e)=>setdesc(e)}
                      value={desc}
                     placeholder='Description' autoFocus={true} placeholderTextColor={colors.primary} style={{fontSize:RFPercentage(2.5),color:colors.primary}} multiline/>
        </View>
        <TouchableOpacity onPress={updateprofile} style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),flexDirection:"row"
    }}>
               <Feather name="upload" size={24} color={colors.white} />
               <Text style={{color:colors.white,fontSize:RFPercentage(2.8),marginLeft:RFPercentage(1)}}>Update</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
  )
   }
}