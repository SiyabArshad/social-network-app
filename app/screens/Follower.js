import { View, KeyboardAvoidingView,Text,StyleSheet,SafeAreaView,TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Platform,ImageBackground,Image,TextInput } from 'react-native'
import * as React from 'react'
import {RFValue,RFPercentage} from "react-native-responsive-fontsize"
import {useTheme} from "@react-navigation/native"
const heightdevice=Dimensions.get('window').height
import { AntDesign,Feather,Entypo,EvilIcons,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import app from "../../firebase"
import {doc,setDoc,getFirestore, addDoc, getDoc,serverTimestamp, updateDoc} from "firebase/firestore"

export default function Follower({navigation,route}) {
  const {colors}=useTheme()
  const db=getFirestore(app)
  const [loading,setloading]=React.useState(false)
  const {list}=route.params
  const [users,setuser]=React.useState([])
  const [tempuser,settempuser]=React.useState([])
  const [search,setsearch]=React.useState("")
  const searchfunction=async(value)=>{
    setsearch(value)
    if(value==="")
    {
        setuser(tempuser)
    }
    else
    {
        setuser(users.filter((item)=>item.username.toLowerCase().includes(value.toLowerCase())))
    }
   
}
  const followerinfo=()=>{
    setuser([])
    settempuser([])
   setloading(true)
   let temprory=[] 
   list?.map(async(item)=>{
        const docRef = doc(db, "users", item.userid);
        const docSnap = await getDoc(docRef);
        temprory.push(docSnap.data())
      })
    setuser(temprory)
    settempuser(temprory)
    setTimeout(() => {
      setloading(false)  
    }, 2000);
   
}
const controller=new AbortController()
React.useEffect(()=>{
  followerinfo()
  return ()=>{
    controller.abort()
  }
},[])

  if(loading)
  {
      return(
       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
           <ActivityIndicator color={colors.primary} size="large"></ActivityIndicator>
       </View>
      )
  }
  else
  {
    return (
        <SafeAreaView style={{flex:1,paddingTop:Platform.OS==='android'?RFPercentage(5):0}}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",margin:RFPercentage(1)}}>
            <TouchableOpacity style={{maxWidth:RFPercentage(4)}} onPress={()=>navigation.navigate("home")}>
            <AntDesign name="back" size={30} color={colors.primary} />
            </TouchableOpacity>
            <TextInput
            onChangeText={(e)=>searchfunction(e)}
            value={search}
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
                    users?.map((item,i)=>(
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
                onPress={()=>navigation.navigate("profile",{userid:item.userid})}
                >
                    <Image
                    resizeMode='cover'
                    source={item.profile?{uri:item.profile}:require("../../assets/profile.jpeg")} style={{
                        width:RFPercentage(10),
                        height:RFPercentage(10),
                        borderRadius:RFPercentage(5),
                        marginRight:RFPercentage(2)
                    }}>
                    </Image>
                    <View>
                    <Text style={{color:colors.grey2,textAlign:"center"}}>{item.username}</Text>
                    <Text style={{color:colors.grey2,textAlign:"center",fontWeight:"300"}}>{item.email}</Text>
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
}