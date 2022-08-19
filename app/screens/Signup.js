import * as React from 'react'
import { View, Text,StyleSheet,Image,TouchableOpacity,Platform,ScrollView,KeyboardAvoidingView} from 'react-native'
import {useTheme} from "@react-navigation/native"
import Register from '../components/Register'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
export default function Signup({navigation}) {
  const {colors}=useTheme()
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
    <View style={{
      flex:1,
      position:"relative",
      backgroundColor:colors.white
    }}>
     <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible&&RFPercentage(2)}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Image style={{height:"40%",width:"100%"}} source={require("../../assets/mnbg.png")}></Image>
   
     <View style={{width:"100%",position:'absolute',display:"flex",alignItems:"center"
     ,justifyContent:"center",
      marginTop:RFPercentage(9),
    }}>
     <Text style={{fontSize:RFPercentage(10),color:colors.white}}>
      FIYR
     </Text>
     </View>
     <ScrollView 
     style={{
      position:"relative"
      ,top:RFPercentage(-5)
         }}
     showsHorizontalScrollIndicator={false}>
        <View
        style={{
          width:"100%",
          minHeight:"100%"
          ,backgroundColor:colors.white,
          borderTopRightRadius:RFPercentage(4),
          borderTopLeftRadius:RFPercentage(4),
          display:"flex",
          alignItems:"center",
          paddingTop:RFPercentage(5)
        }}
        >
  
          <Register></Register>
  
          <TouchableOpacity style={{
            display:'flex',
            flexDirection:"row"
          }}
          onPress={()=>navigation.navigate("signin")}
          >
          <Text
          style={{
            fontSize:RFPercentage(2),
            color:colors.black,
            fontWeight:"bold",
          }}
          >
            Already have an Account?
          </Text>
        <Text
          style={{
                  fontSize:RFPercentage(2),
                  color:colors.primary,
                  fontWeight:"bold"
        }}
        >
          SIGNIN
        </Text>
        </TouchableOpacity>
         
        </View>
     </ScrollView>
     </KeyboardAvoidingView>
    </View>
  )
}

const styles=StyleSheet.create({
    signupcontainer:{
        flex:1,
        position:"relative",
    }
})