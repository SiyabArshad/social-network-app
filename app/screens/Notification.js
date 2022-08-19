import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
import { AntDesign,Entypo,EvilIcons,FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
export default function Notification({navigation}) {
    const {colors}=useTheme()
    let desc="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content." 
  
  return (
    <View 
    style={{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:"space-between",
        paddingTop:RFPercentage(3.5)
    }}
    >

      <Text style={{color:colors.primary,margin:RFPercentage(2),fontSize:RFPercentage(3),fontWeight:"600"}}>Notifications</Text>
<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
        {
            [1,2,3,4,5,6,7].map((item,i)=>(
            <View key={i} style={{
                display:"flex",flexDirection:"row",justifyContent:"space-between",backgroundColor:colors.lightprimary
                ,margin:RFPercentage(1),padding:RFPercentage(1),borderRadius:RFPercentage(1.7)
        }}>
                <View style={{display:"flex",flexDirection:"row",width:"80%"}}>
                <Image style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3),
                    marginRight:RFPercentage(1.5)
                    }} source={require("../../assets/profile.jpeg")}></Image>
                <View>
                <Text style={{color:colors.back,fontWeight:"bold"}}>Name here</Text>
                <Text style={{color:colors.black,fontWeight:"300",textAlign:"justify"}}>{desc}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:colors.black}}>1 hour ago</Text>
                </View>
                </View>                
            ))
        }
  
    </ScrollView>
    
      <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  )
}