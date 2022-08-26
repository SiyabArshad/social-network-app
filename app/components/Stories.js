import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"


export default function Stories({navigation,stories}) {
const{colors}=useTheme()
  
    return (
    <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} horizontal={true}>
        <View
        style={{
            display:"flex",
            flexDirection:"row",
        }}
        >
        {
            stories?.map((item,i)=>(
                <TouchableOpacity key={i} onPress={()=>navigation.navigate("story",{storydata:item})}>
                <Image
                resizeMode='stretch'
                  style={{
                    width:RFPercentage(8),
                    height:RFPercentage(8),
                    borderRadius:RFPercentage(4),
                    marginRight:RFPercentage(1)
                  }}
                  source={{uri:item?.profile}}
                  />
                  </TouchableOpacity>
                ))
        }
        </View>
      
    </ScrollView>    
  )
}