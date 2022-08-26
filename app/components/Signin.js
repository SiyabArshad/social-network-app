import * as React from 'react'
import { View, Text,StyleSheet,TextInput,SafeAreaView,Button,TouchableOpacity,ActivityIndicator } from 'react-native'
import {useTheme} from "@react-navigation/native"
import * as yup from 'yup';
import { Formik, Field } from 'formik'
import {RFPercentage,RFValue} from "react-native-responsive-fontsize"
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification,signInWithEmailAndPassword} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, getDoc,serverTimestamp} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import { useSelector,useDispatch } from 'react-redux';
import Toast from 'react-native-root-toast'
import {loginuser} from "../redux/action"

export default function Signin() {
  const auth=getAuth(app)
  const db=getFirestore(app)
  const dispatch = useDispatch();
  const [loading,setloading]=React.useState(false)
    const {colors}=useTheme()
    //schema for signin frontend validation
    const signInValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is required'),
      password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
         })
    //ends yup
   //function for signin
         const loginfunction=async(values)=>{
          setloading(true)
          const{email,password}=values
          try{
            const userlogin= await signInWithEmailAndPassword(auth,email,password)
            const docRef = doc(db, "users", userlogin.user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                    //login action call
                    const userdata=docSnap.data()
                    if(userdata?.active===true)
                    {
                      await dispatch(loginuser(userdata))
                      let toast = Toast.show("Login Successfully", {
                        duration: Toast.durations.LONG,
                      });
                      setTimeout(function hideToast() {
                        Toast.hide(toast);
                        //navigation.navigate("signin")
                      }, 2000);
                      setloading(false)
                    }
                    else
                    {
                      let toast = Toast.show("Your Account is Deactivated", {
                        duration: Toast.durations.LONG,
                      });
                      setTimeout(function hideToast() {
                        Toast.hide(toast);
                        //navigation.navigate("signin")
                      }, 2000);
                      setloading(false)
                    }
                               
                  } 
        else {
          let toast = Toast.show("Login Failed", {
            duration: Toast.durations.LONG,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
            //navigation.navigate("signin")
          }, 2000);
              setloading(false)      
            }
             
           }
         catch(e){
           let toast = Toast.show(e.message, {
             duration: Toast.durations.LONG,
           });
           setTimeout(function hideToast() {
             Toast.hide(toast);
           }, 1000);
           setloading(false)
         }

         }
   //ends signin function
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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={signInValidationSchema}
        onSubmit={values => loginfunction(values)}
      >
        {({ handleSubmit, isValid }) => (
          <>
           
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <Field
              component={CustomInput}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={{
                backgroundColor:colors.primary,
                width: '90%',
                marginTop:RFPercentage(2),
                marginBottom:RFPercentage(5),
                borderRadius: RFPercentage(4),
                paddingHorizontal:RFPercentage(2),
                paddingVertical:RFPercentage(2.5),
                fontWeight:"bold"
              }}
            >
              <Text style={{color:colors.white,textAlign:"center",fontSize:RFPercentage(2),fontWeight:"bold"}}>Sign in</Text>
              </TouchableOpacity>
          </>
        )}
      </Formik>
  )
            }
}


const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value},
    form: { errors, touched, setFieldTouched,isValid },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]
  return (
    <>
         {!isValid && <View style={{backgroundColor:"white",padding:RFPercentage(1),width:"90%"}}><Text style={styles.errorText}>{errors[name]}</Text></View>}
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput,
          !hasError && styles.sucessInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    borderRadius: RFPercentage(4),
    backgroundColor:"#F3F5F7",
    paddingHorizontal:RFPercentage(2),
    paddingVertical:RFPercentage(2.5),
    marginBottom:RFPercentage(2)  
  },
  errorText: {
    fontSize: RFPercentage(1.5),
    color: 'red',
    
  },
  
  errorInput: {
    borderColor: 'red',
    borderWidth:RFPercentage(.1)
  },
  sucessInput:{
    borderWidth:RFPercentage(.1)
    ,borderColor:'green'
  }
})
