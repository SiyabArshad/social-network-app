import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,Keyboard,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';

export default function Comments({navigation}) {
    const{colors}=useTheme()
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

 React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
    let desc="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content." 
    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.white}}> 
            <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible&&RFPercentage(2)}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={{paddingHorizontal:RFPercentage(2),display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <TouchableOpacity onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={{color:colors.primary,fontSize:RFPercentage(2)}}>Comments</Text>
            </View>
            <View style={{height:"100%",display:"flex",justifyContent:"flex-end"}}>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} 
            horizontal={false}
            >
                
             <View style={{padding:RFPercentage(1.6)}}>
                <>             
                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{display:"flex",flexDirection:"row",width:"80%"}}>
                <Image style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3),
                    marginRight:RFPercentage(1.5)
                    }} source={require("../../assets/profile.jpeg")}></Image>
                <View>
                <Text style={{color:colors.back,fontWeight:"bold"}}>Name here</Text>
                <Text style={{color:colors.black,fontWeight:"300",textAlign:"justify"}}>{desc}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:colors.black}}>1 hour ago</Text>
                </View>
                </View>
                <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <TouchableOpacity>
                    <Entypo name="reply" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity><Text style={{color:colors.primary}}>Replies</Text></TouchableOpacity>      
                </View>
                </>
                {/**reply design */}
                <>             
                <View style={{marginLeft:RFPercentage(5),display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <View style={{display:"flex",flexDirection:"row",width:"80%"}}>
                <Image style={{height:RFPercentage(6),width:RFPercentage(6),borderRadius:RFPercentage(3),
                    marginRight:RFPercentage(1.5)
                    }} source={require("../../assets/profile.jpeg")}></Image>
                <View>
                <Text style={{color:colors.back,fontWeight:"bold"}}>Name here</Text>
                <Text style={{color:colors.black,fontWeight:"300",textAlign:"justify"}}>{desc}</Text>
                </View>
                </View>
                <View>
                    <Text style={{color:colors.black}}>1 hour ago</Text>
                </View>
                </View>
                <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end"}}>
                    <TouchableOpacity>
                    <Entypo name="reply" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <TouchableOpacity><Text style={{color:colors.primary}}>Replies</Text></TouchableOpacity>      
                </View>
                </>
                {/**reply design end */}
                     </View>
            </ScrollView>
            
            <View style={{margin:RFPercentage(2),display:"flex",flexDirection:"row"
                     ,justifyContent:"space-between"
                     ,borderRadius:RFPercentage(1.5),
                     borderColor:colors.primary,
                     borderWidth:RFPercentage(.1),
                     paddingHorizontal:RFPercentage(1),
                     paddingVertical:RFPercentage(1.2)
                     
                     }}>
                        <TextInput style={{
                        width:"90%",
                    }} placeholder='comment'
                    >
                    </TextInput>
                    <TouchableOpacity
                    style={{
                        display:"flex",justifyContent:"center",
                        alignItems:"center"
                    }}
                    ><Text style={{color:colors.primary}}>Post</Text></TouchableOpacity>
                </View>
                     </View>
                     </KeyboardAvoidingView>
       </SafeAreaView>
   
  )
}