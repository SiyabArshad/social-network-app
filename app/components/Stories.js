import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"


export default function Stories({navigation}) {
const{colors}=useTheme()
  const storiesarray=[1,2,3,4,5,7,8,89,9,6]
    return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal={true}>
        <View
        style={{
            display:"flex",
            flexDirection:"row",
        }}
        >
        {
            storiesarray.map((item,i)=>(
                <TouchableOpacity key={i} onPress={()=>navigation.navigate("story")}>
                <Image
                resizeMode='stretch'
                  style={{
                    width:RFPercentage(8),
                    height:RFPercentage(8),
                    borderRadius:RFPercentage(4),
                    marginRight:RFPercentage(1)
                  }}
                  source={require("../../assets/profile.jpeg")}
                  />
                  </TouchableOpacity>
                ))
        }
        </View>
      
    </ScrollView>    
  )
}