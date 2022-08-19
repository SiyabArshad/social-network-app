import * as React from 'react'
import { View, Text,StyleSheet,Image,TouchableOpacity,ScrollView} from 'react-native'
import {useTheme} from "@react-navigation/native"
import Otp from '../components/Otp'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
export default function Verification({navigation}) {
  const {colors}=useTheme()
  return (
    <View style={{
        flex:1,
        position:"relative",
        backgroundColor:colors.white
      }}>
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
    <Otp></Otp>           
        </View>
     </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
    signupcontainer:{
        flex:1,
        position:"relative",
        
    }
})