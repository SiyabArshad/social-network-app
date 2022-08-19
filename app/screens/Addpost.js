import { View, KeyboardAvoidingView,Keyboard,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Addpost({navigation}) {
    const[desc,setdesc]=React.useState("")
    const[content,setcontent]=React.useState("")
    const [isvdeo,setisvideo]=React.useState(false)
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const {colors}=useTheme()

    
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
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

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
    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible&&RFPercentage(2)}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("addcontent")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",textTransform:"capitalize"
        }}>
          Add Post
        </Text>
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
                     <TextInput placeholder='Description' autoFocus={true} placeholderTextColor={colors.primary} style={{fontSize:RFPercentage(2.5),color:colors.primary}} multiline/>
           
        </View>
        <TouchableOpacity style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:content===''||content===undefined||content===null?"none":"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),flexDirection:"row"
    }}>
               <Feather name="upload" size={24} color={colors.white} />
               <Text style={{color:colors.white,fontSize:RFPercentage(2.8),marginLeft:RFPercentage(1)}}>Post</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
  )
}