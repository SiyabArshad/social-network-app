import { View, KeyboardAvoidingView,Keyboard,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';

export default function AddTweet({navigation}) {
    const[tweet,settweet]=React.useState("")
    const {colors}=useTheme()
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
    return (
        <SafeAreaView style={{flex:1}}>
                 <KeyboardAvoidingView  style={{flex:1,marginBottom:isKeyboardVisible&&RFPercentage(2)}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4),margin:RFPercentage(2)}} onPress={()=>navigation.navigate("addcontent")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <Text  
            style={{textAlign:"center",color:colors.grey2
            ,fontSize:RFPercentage(3),fontWeight:"400",textTransform:"capitalize"
        }}>
          Add Fleet
        </Text>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginVertical:RFPercentage(2)}}>
                <View 
                 style={{
                    backgroundColor:colors.lightprimary,
                   width:"90%",
                   marginVertical:RFPercentage(2),
                   padding:RFPercentage(2),
                   borderRadius:RFPercentage(2),
                   minHeight:RFPercentage(30),
                   shadowColor: colors.primary,
                   shadowOffset: { width: 0, height: 1 },
                   shadowOpacity: 0.8,
                   shadowRadius: 2,  
                   elevation: 5
                    }}
                >     
                     <TextInput autoFocus={true} placeholder='Fleet' placeholderTextColor={colors.primary} style={{fontSize:RFPercentage(2.5),color:colors.primary}} multiline/>
           
        </View>
        <TouchableOpacity style={{width:"50%",backgroundColor:colors.primary,borderRadius:RFPercentage(1.5)
        ,display:"flex",justifyContent:"center",alignItems:"center",padding:RFPercentage(1.8),
        flexDirection:"row"
    }}>
            <EvilIcons name="sc-telegram" size={30} color={colors.white} />
        <Text style={{color:colors.white,fontSize:RFPercentage(2.8)}}>Fleet</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
  )
}