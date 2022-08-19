import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function Post({navigation}) {
    const{colors}=useTheme()
    const [readmore,setreadmore]=React.useState(true)
    const [isvdeo,setisvideo]=React.useState(false)
    const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
    let desc="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. "
    const [likes,setlikes]=React.useState(false)
    return (
        <View
        style={{
            marginBottom:RFPercentage(2),
            elevation:2
        }}
        >
     {   
     isvdeo?
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
             <TouchableOpacity onPress={()=>navigation.navigate("profile")}>   
            <Image
            style={{
                width:RFPercentage(6),
                height:RFPercentage(6),
                borderRadius:RFPercentage(3),
                marginRight:RFPercentage(2)
            }}
            source={require("../../assets/profile.jpeg")}
            />
            </TouchableOpacity>
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
     <Video
     ref={video}
      style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),    
    }}
     source={{
       uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
     }}
     useNativeControls
     resizeMode="cover"
     isLooping
     onPlaybackStatusUpdate={status => setStatus(() => status)}
   />
   </>
   :<ImageBackground 
   resizeMode='cover'
   style={{
    height:(50/100)*heightdevice,
    padding:RFPercentage(1),
    
}}
   source={require("../../assets/post1.jpeg")}
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
    <TouchableOpacity onPress={()=>navigation.navigate("profile")}>
            <Image
            style={{
                width:RFPercentage(6),
                height:RFPercentage(6),
                borderRadius:RFPercentage(3),
                marginRight:RFPercentage(2)
            }}
            source={require("../../assets/profile.jpeg")}
            />
       </TouchableOpacity>     
            <Text
            style={{
                fontSize:RFPercentage(2),
                color:colors.grey1
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
                color:colors.grey1
            }}
            >1 Hour ago</Text>
            </View>
            
        </View>
   </ImageBackground>
}
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
   </View>
  )
}