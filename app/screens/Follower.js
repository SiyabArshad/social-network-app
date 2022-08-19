import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
export default function Follower({navigation}) {
  const {colors}=useTheme()
    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",margin:RFPercentage(1)}}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4)}} onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TextInput
            placeholder='Search Follower'
            placeholderTextColor={colors.primary}
            style={{
                width:"90%",
                paddingHorizontal:RFPercentage(2),
                paddingVertical:RFPercentage(1.5),
                borderRadius:RFPercentage(2),
                borderWidth:RFPercentage(.1),
                borderColor:colors.primary
            }}
            />
            </View>
          <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
                {
                    [1,2,3,4,5,6,7,8,9,4].map((item,i)=>(
                <TouchableOpacity key={i} style={{
                    padding:RFPercentage(1.5),
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center",
                    backgroundColor:colors.lightprimary,
                    marginHorizontal:RFPercentage(1),
                    marginVertical:RFPercentage(.4),
                    borderRadius:RFPercentage(1.7),
                    shadowColor:colors.primary,
                    shadowOpacity:0.9,
                    shadowRadius:RFPercentage(.4),
                    elevation:5,
                    shadowOffset:{width:0,height:1},
                }}
                onPress={()=>navigation.navigate("inbox")}
                >
                    <Image
                    resizeMode='cover'
                    source={require("../../assets/profile.jpeg")} style={{
                        width:RFPercentage(10),
                        height:RFPercentage(10),
                        borderRadius:RFPercentage(5),
                        marginRight:RFPercentage(2)
                    }}>
                    </Image>
                    <View>
                    <Text style={{color:colors.grey2,textAlign:"center"}}>Name Here</Text>
                    <Text style={{color:colors.grey2,textAlign:"center",fontWeight:"300"}}>name@gmail.com</Text>
                    </View>
                    <View>
                    <Text style={{color:colors.grey2,textAlign:"center",fontWeight:"200"}}>Follower</Text>
                    </View>
                </TouchableOpacity>
 ))
}
          </ScrollView>            
        </SafeAreaView>
  )
}