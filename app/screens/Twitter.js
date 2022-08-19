import { View, Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
import { AntDesign,Entypo,EvilIcons,FontAwesome5 } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
export default function Twitter({navigation}) {
    const {colors}=useTheme()
    const[search,setsearch]=React.useState("")
    const[topnav,settopnav]=React.useState("popular")
    return (
    <View
    style={{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:"space-between",
        paddingTop:RFPercentage(3.5)
    }}
    >
    <View
    style={{
        padding:RFPercentage(2)
    }}
    >
     <View
     style={{
        display:"flex",
        flexDirection:'row',
        justifyContent:"space-between"

     }}
     >
        <TextInput
        placeholder='Search'
        style={{
            width:"85%",
            backgroundColor:colors.lightprimary,
            borderRadius:RFPercentage(4),
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(2)
        }}
        ></TextInput>
        <TouchableOpacity
        style={{
            backgroundColor:colors.lightprimary,
            borderRadius:"50%",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:RFPercentage(6),
            height:RFPercentage(6),
            paddingHorizontal:RFPercentage(1),
            paddingVertical:RFPercentage(1)
        }}
     
        >
            <EvilIcons name="sc-telegram" size={30} color={colors.primary} />
        </TouchableOpacity>
     </View>
        <View style={{
            display:"flex",
            flexDirection:"row",
            paddingVertical:RFPercentage(1.1),
            
        }}>
        <TouchableOpacity
        style={{
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(1.5),
            backgroundColor:topnav==='popular'?colors.lightprimary:colors.grey1,
            borderRadius:RFPercentage(3),
            marginRight:RFPercentage(1.5)
        }}
        onPress={()=>settopnav('popular')}
     >
            <Text
            style={{
                color:topnav==='popular'?colors.primary:colors.grey2
            }}
            >Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(1.5),
            backgroundColor:topnav==='trending'?colors.lightprimary:colors.grey1,
            borderRadius:RFPercentage(3),
            marginRight:RFPercentage(1.5)
        }}
        onPress={()=>settopnav('trending')}
        >
            <Text
            style={{
                color:topnav==='trending'?colors.primary:colors.grey2
            }}
            >Trending</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={{
            paddingHorizontal:RFPercentage(2),
            paddingVertical:RFPercentage(1.5),
            backgroundColor:topnav==='followed'?colors.lightprimary:colors.grey1,
            borderRadius:RFPercentage(3),
            marginRight:RFPercentage(1.5)
        }}
        onPress={()=>settopnav('followed')}
        >
            <Text
            style={{
                color:topnav==='followed'?colors.primary:colors.grey2
            }}
            >Followed</Text>
        </TouchableOpacity>
        </View>
    </View>
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
   horizontal={false}
   style={{
    paddingHorizontal:RFPercentage(2)
   }}
   > 
   {
    [1,2,3,4,5,4,6].map((item,i)=>(
        <Tweet key={i} navigation={navigation} />
    ))
   }
    </ScrollView>
    <BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  )
}
