import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Stories from '../components/Stories'
import Post from '../components/Post'
import { AntDesign,Entypo,EvilIcons,FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
import { GiftedChat } from 'react-native-gifted-chat'

export default function Inbox({navigation}) {
    const [messages, setMessages] = React.useState([]);
    const {colors}=useTheme()
    React.useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    return (
    <View style={{flex:1,backgroundColor:colors.white,paddingTop:RFPercentage(4)}}>
      <View style={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center",padding:RFPercentage(1.5)}}>
        <Image source={require("../../assets/profile.jpeg")} style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3)}} resizeMode="cover"></Image>
        <Text style={{color:colors.grey2}}>9:30 pm</Text>
        <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("contacts")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            
           </View>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
     {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  )
}