import * as React from 'react'
import { View, Text,KeyboardAvoidingView,Keyboard,Platform,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native'
import {useTheme} from "@react-navigation/native"
import NewPassword from '../components/NewPassword'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
export default function ResetPassword({navigation}) {
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
<NewPassword></NewPassword> 
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