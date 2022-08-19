import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';

export default function Tweet({navigation}) {
    const{colors}=useTheme()
    const [readmore,setreadmore]=React.useState(true)
    let desc="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "
    const [likes,setlikes]=React.useState(false)
    return (
        <View
        style={{
            marginBottom:RFPercentage(2),
            elevation:2
        }}
        >
<>

<View
        style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-between",
            marginBottom:RFPercentage(1)
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
            source={require("../../assets/profile.jpeg")}
            />
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey2
            }}
            >David Boe</Text>
            </View>
            <View
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"center"
            }}
            >
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey2
            }}
            >1 Hour ago</Text>
            </View>
            
        </View>
        <View style={{
    paddingHorizontal:RFPercentage(1)
   }}>
    <Text
    style={{
        color:colors.grey2,
        textAlign:"justify"
    }}
    >{ readmore?desc.slice(0,50):desc.slice(0,desc.length)}</Text>
    <TouchableOpacity
     onPress={()=>{
        setreadmore(!readmore)
     }}
    >
   <Text 
   style={{
    color:colors.primary
   }}
   >{readmore?"readmore":"showless"}</Text>
  </TouchableOpacity>
   </View>
</>

    
   <View style={{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:RFPercentage(2),
    paddingHorizontal:RFPercentage(1)
   }}>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity onPress={()=>setlikes(!likes)} style={{marginRight:RFPercentage(.5)}}>
    <AntDesign  name={likes?"heart":"hearto"} size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>navigation.navigate("comments")} style={{marginRight:RFPercentage(.5)}}>
    <FontAwesome5  name="comment" size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity>
    <AntDesign name="sharealt" size={22} color={colors.primary} />
    </TouchableOpacity>
    </View>
    <View style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <TouchableOpacity style={{marginRight:RFPercentage(.5)}}>
    <MaterialIcons name="report-problem" size={22} color={colors.primary} />
    </TouchableOpacity>
    <TouchableOpacity>
    <Feather name="delete" size={22} color={colors.primary} />
    </TouchableOpacity>
    </View>
   </View>
   <Text style={{margin:RFPercentage(1),color:colors.grey2,fontSize:RFPercentage(1.7),fontWeight:"200"}}>300 likes 200 comments 21 shares</Text>
   </View>
  )
}