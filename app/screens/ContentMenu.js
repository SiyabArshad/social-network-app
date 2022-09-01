import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';

export default function ContentMenu({navigation}) {
  const {colors}=useTheme()
    return (
        <SafeAreaView style={{flex:1}}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",textTransform:"capitalize"
        }}>
            FIYR Upload Center
        </Text>
            <TouchableOpacity
            style={{
            marginHorizontal:RFPercentage(2),
            marginVertical:RFPercentage(2),
            height:RFPercentage(15),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:RFPercentage(2),
            borderWidth:RFPercentage(.2),
            borderColor:colors.primary
            }}
            onPress={()=>navigation.navigate("addpost")}
            >
                <Text style={{color:colors.black,fontSize:RFPercentage(2.5)}}>
                    Add new Post
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
            marginHorizontal:RFPercentage(2),
            height:RFPercentage(15),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:RFPercentage(2),
            borderWidth:RFPercentage(.2),
            borderColor:colors.primary
            }}
            onPress={()=>navigation.navigate("addtweet")}
            >
                <Text style={{color:colors.black,fontSize:RFPercentage(2.5)}}>
                    Add new Tweet
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
            margin:RFPercentage(2),
            height:RFPercentage(15),
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:RFPercentage(2),
            borderWidth:RFPercentage(.2),
            borderColor:colors.primary
            }}
            onPress={()=>navigation.navigate("addstory")}
            >
                <Text style={{color:colors.black,fontSize:RFPercentage(2.5)}}>
                    Share Your Story
                </Text>
            </TouchableOpacity>
                        
        </SafeAreaView>
  )
}