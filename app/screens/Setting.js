import { View, Text,StyleSheet,SafeAreaView,Linking,Keyboard,TouchableOpacity,Switch,ActivityIndicator,Dimensions,ScrollView,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
import Tweet from '../components/Tweet'
import { AntDesign,Entypo,EvilIcons,FontAwesome5,Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation'
import { Video, AVPlaybackStatus } from 'expo-av';
export default function Setting({navigation}) {
    const {colors}=useTheme()
    return (
        <View
        style={{
            flex:1,
            backgroundColor:colors.white,
            justifyContent:"space-between"
        }}
        >
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
        <ImageBackground style={{height:Dimensions.get("window").height,width:"100%"}}  source={require("../../assets/dbn.png")}>
        {/**inside image background */}
            <View
             style={{padding:RFPercentage(1.4),marginHorizontal:RFPercentage(2),height:RFPercentage(16),
                backgroundColor:"#515675"
            ,display:"flex",flexDirection:"row",borderRadius:RFPercentage(1.3),marginTop:RFPercentage(7),marginBottom:RFPercentage(5)
        }}>
                <Image style={{height:RFPercentage(12),width:RFPercentage(12),borderRadius:RFPercentage(6)}} source={require("../../assets/profile.jpeg")}></Image>
            <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginLeft:RFPercentage(3)}}>
                <Text style={{fontSize:RFPercentage(2),fontWeight:"bold",color:"#fff"}}>username here</Text>
                <Text style={{fontSize:RFPercentage(1.6),fontWeight:"300",color:"#fff"}}>usernamehere@gmail.com</Text>
            </View>
            </View>
            <View style={{display:"flex",flexDirection:"column"}}>
                {/**menu items */}
                <View style={{padding:RFPercentage(1.4), backgroundColor:"#515675",width:"70%",marginBottom:RFPercentage(2)
            ,borderTopRightRadius:RFPercentage(2),borderBottomRightRadius:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
            }}>
                <Text style={{color:"#fff",fontSize:RFPercentage(2)}}>Edit Profile</Text>
                <TouchableOpacity onPress={()=>navigation.navigate("edit")} style={{backgroundColor:"#72758d",height:RFPercentage(5),width:RFPercentage(5)
                ,borderRadius:RFPercentage(2.5),display:"flex",justifyContent:"center",alignItems:'center'
            }}>
            <MaterialCommunityIcons name="greater-than" size={20} color="white" />
                </TouchableOpacity>
                </View>
                <View style={{padding:RFPercentage(1.4), backgroundColor:"#515675",width:"70%",marginBottom:RFPercentage(2)
            ,borderTopRightRadius:RFPercentage(2),borderBottomRightRadius:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
            }}>
                <Text style={{color:"#fff",fontSize:RFPercentage(2)}}>Social</Text>
                <TouchableOpacity onPress={()=>Linking.openURL("https://web.facebook.com/FIYR-110786498310460/")} style={{backgroundColor:"#72758d",height:RFPercentage(5),width:RFPercentage(5)
                ,borderRadius:RFPercentage(2.5),display:"flex",justifyContent:"center",alignItems:'center'
            }}>
            <MaterialCommunityIcons name="greater-than" size={20} color="white" />
                </TouchableOpacity>
                </View>
                <View style={{padding:RFPercentage(1.4), backgroundColor:"#515675",width:"70%",marginBottom:RFPercentage(2)
            ,borderTopRightRadius:RFPercentage(2),borderBottomRightRadius:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
            }}>
                <Text style={{color:"#fff",fontSize:RFPercentage(2)}}>Terms & Privacy</Text>
                <TouchableOpacity onPress={()=>Linking.openURL("https://www.privacypolicies.com/live/08783721-8b3e-4941-b8a0-05504b468237")}   style={{backgroundColor:"#72758d",height:RFPercentage(5),width:RFPercentage(5)
                ,borderRadius:RFPercentage(2.5),display:"flex",justifyContent:"center",alignItems:'center'
            }}>
            <MaterialCommunityIcons name="greater-than" size={20} color="white" />
                </TouchableOpacity>
                </View>
                <View style={{padding:RFPercentage(1.4), backgroundColor:"#515675",width:"70%",marginBottom:RFPercentage(2)
            ,borderTopRightRadius:RFPercentage(2),borderBottomRightRadius:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
            }}>
                <Text style={{color:"#fff",fontSize:RFPercentage(2)}}>Website</Text>
                <TouchableOpacity onPress={()=>Linking.openURL("https://fiyr-eac63.web.app/")} style={{backgroundColor:"#72758d",height:RFPercentage(5),width:RFPercentage(5)
                ,borderRadius:RFPercentage(2.5),display:"flex",justifyContent:"center",alignItems:'center'
            }}>
            <MaterialCommunityIcons name="greater-than" size={20} color="white" />
                </TouchableOpacity>
                </View>
                <View style={{padding:RFPercentage(1.4), backgroundColor:"#515675",width:"70%",marginBottom:RFPercentage(2)
            ,borderTopRightRadius:RFPercentage(2),borderBottomRightRadius:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"
            }}>
                <Text style={{color:"#fff",fontSize:RFPercentage(2)}}>Contact us</Text>
                <TouchableOpacity onPress={()=>Linking.openURL("mailto:fiyr.theapp@gmail.com")} style={{backgroundColor:"#72758d",height:RFPercentage(5),width:RFPercentage(5)
                ,borderRadius:RFPercentage(2.5),display:"flex",justifyContent:"center",alignItems:'center'
            }}>
            <MaterialCommunityIcons name="greater-than" size={20} color="white" />
                </TouchableOpacity>
                </View>
            {/**menu items end*/}
            </View>
            
            <TouchableOpacity style={{backgroundColor:colors.white,width:"30%",display:"flex",flexDirection:"row"
                ,justifyContent:"center",alignItems:"center",padding:RFPercentage(1.3)
                ,margin:RFPercentage(2),borderRadius:RFPercentage(1.8)
        }}>
            <Text style={{color:colors.black,marginRight:RFPercentage(1)}}>Log out</Text>
            <AntDesign name="logout" size={20} color={colors.black} />
        </TouchableOpacity>
        {/**end*/}
        </ImageBackground>
    </ScrollView>      
<BottomNavigation navigation={navigation}></BottomNavigation>
    </View>
  )
}