import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,Ionicons,SimpleLineIcons,Foundation,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function BottomNavigation({navigation}) {
    const{colors}=useTheme()
    return (
    <View style={{
        backgroundColor:colors.white,
        paddingHorizontal:RFPercentage(5),
        paddingVertical:RFPercentage(2.5),
        borderTopLeftRadius:RFPercentage(1.6),
        borderTopRightRadius:RFPercentage(1.6)
        ,shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    }}
    
    >
        <View
        style={{
            display:"flex",
            flexDirection:"row"
        }}
        >
        <TouchableOpacity
        onPress={()=>navigation.navigate("home")}
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginRight:RFPercentage(4)
        }}
        >
        <Foundation name="home" size={30} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
         onPress={()=>navigation.navigate("twitter")}
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
        >
        <AntDesign name="retweet" size={30} color={colors.primary} />
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity
        onPress={()=>navigation.navigate("addcontent")}
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:colors.primary,
            height:RFPercentage(10),
            width:RFPercentage(10),
            borderRadius:RFPercentage(5),
            position:"absolute",
            left:"50%",
            top:-50,
        }}
        >
   <Ionicons name="add-circle" size={30} color={colors.white} />
        </TouchableOpacity>
        <View
        style={{
            display:"flex",
            flexDirection:"row"
        }}
        >
        <TouchableOpacity
             onPress={()=>navigation.navigate("notifications")}
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            marginRight:RFPercentage(4)
        }}
        >
        <MaterialIcons name="notifications-none" size={30} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
        }}
        onPress={()=>navigation.navigate("profile")}
        >
        <AntDesign name="user" size={30} color={colors.primary} />
        </TouchableOpacity>
        </View>
    </View>
  )
}