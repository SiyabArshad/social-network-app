import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,Switch,ActivityIndicator,Dimensions,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
import { AntDesign,Entypo,EvilIcons,FontAwesome5,Feather } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
import { Video, AVPlaybackStatus } from 'expo-av';
export default function Profile({navigation}) {
    const {colors}=useTheme()
    const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [readmore,setreadmore]=React.useState(true)
  const [isvdeo,setisvideo]=React.useState(false)
  const video = React.useRef(null);
const [status, setStatus] = React.useState({});
  return (
    <View
    style={{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:"space-between"
    }}
    > 
<View style={{marginTop:RFPercentage(5),padding:RFPercentage(2)}}>
  <View style={{display:'flex',justifyContent:"space-between",flexDirection:"row"}}>
    <Text style={{color:colors.grey2}}>@Name here</Text>
    <TouchableOpacity onPress={()=>navigation.navigate("setting")}>
    <Feather name="settings" size={24} color={colors.primary} />
    </TouchableOpacity>
  </View>
  <View style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <Image style={{height:RFPercentage(12),width:RFPercentage(12),borderRadius:RFPercentage(6)}} source={require("../../assets/profile.jpeg")}></Image>
    <Text style={{marginTop:RFPercentage(1.2),fontSize:RFPercentage(2)}}>username here</Text>
    <Text style={{color:colors.grey2,marginTop:RFPercentage(.1)}}>Profile</Text>
  </View>
  <View style={{display:'flex',justifyContent:"center",alignItems:"center",flexDirection:"row",marginVertical:RFPercentage(.7)}}>
    <Text style={{color:colors.primary,fontSize:RFPercentage(2.2),marginRight:RFPercentage(2)}}>Follow</Text>
    <Switch
        trackColor={{ false: colors.lightprimary, true: colors.primary }}
        thumbColor={isEnabled ? colors.primary : colors.primary}
        ios_backgroundColor={colors.lightprimaryprimary}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
      />
      <Text style={{color:colors.primary,fontSize:RFPercentage(2.2),marginRight:RFPercentage(2)}}>Private</Text>
    <Switch
        trackColor={{ false: colors.lightprimary, true: colors.primary }}
        thumbColor={isEnabled ? colors.primary : colors.primary}
        ios_backgroundColor={colors.lightprimaryprimary}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: .7 }, { scaleY: .7 }] }}
      />
  </View>
  <View style={{margin:RFPercentage(1.7),paddingVertical:RFPercentage(2),paddingHorizontal:RFPercentage(5),backgroundColor:colors.grey1,display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
,borderRadius:RFPercentage(1.5)
}}>
    <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={()=>navigation.navigate("follower")}>
        <Text style={{marginRight:RFPercentage(1.2)}}>220</Text>
        <Text style={{color:colors.grey2}}>Follower</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{display:"flex",flexDirection:"row"}} onPress={()=>navigation.navigate("following")}>
        <Text style={{marginRight:RFPercentage(1.2)}}>220</Text>
        <Text style={{color:colors.grey2}}>Following</Text>
    </TouchableOpacity>
</View>
<View style={{marginHorizontal:RFPercentage(1.7),
paddingVertical:RFPercentage(2),paddingHorizontal:RFPercentage(5),
backgroundColor:colors.lightprimary,display:"flex",
justifyContent:"center",alignItems:"center"
,borderRadius:RFPercentage(1.5)
}}>
    <View style={{display:"flex",flexDirection:"row"}}>
        <Text style={{marginRight:RFPercentage(1.2),color:colors.primary}}>0</Text>
        <Text style={{color:colors.primary}}>Shots</Text>
    </View>
</View>
</View>
<ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
    <View style={{display:"flex",flexDirection:"row"
    ,flexWrap:"wrap",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.2)}}>
 {
    1?
    [1,2,3,4,66].map((item,i)=>(
        1?
        <ImageBackground key={i} source={require("../../assets/post1.jpeg")}
        resizeMode="cover"
        style={{minHeight:RFPercentage(20),minWidth:RFPercentage(20),margin:RFPercentage(.5)}}
        imageStyle={{
            borderRadius:RFPercentage(1.5)
        }}
        />
        :
        <Video
        ref={video}
        style={{minHeight:RFPercentage(20),minWidth:RFPercentage(20),margin:RFPercentage(.5),borderRadius:RFPercentage(1.5)}}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="cover"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
    ))
    :
    <Text>No Post to show</Text>
 }
    </View>
</ScrollView>
<BottomNavigation navigation={navigation}></BottomNavigation>
</View>
  )
}