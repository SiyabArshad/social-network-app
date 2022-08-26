import { View, KeyboardAvoidingView,Keyboard,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Story({navigation,route}) {
    const{storydata}=route?.params
    const{colors}=useTheme()
   
  return (
<View style={{flex:1}}>
    <ImageBackground 
   resizeMode="stretch"
   style={{
    paddingHorizontal:RFPercentage(1),
    paddingTop:RFPercentage(5),
    height:heightdevice,
    width:Dimensions.get('window').width
}}
   source={{uri:storydata?.story}}
   >
        <View
        style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between"
        }}
        >
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
            <Image
            style={{
                width:RFPercentage(6),
                height:RFPercentage(6),
                borderRadius:RFPercentage(3),
                marginRight:RFPercentage(2)
            }}
            source={{uri:storydata.profile}}
            />
            </View>
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            
            
        </View>
   </ImageBackground>
</View>
    )
}