import * as React from 'react'
import { View, KeyboardAvoidingView,Text,StyleSheet,TextInput,SafeAreaView,Button,TouchableOpacity,ActivityIndicator } from 'react-native'
import {useTheme} from "@react-navigation/native"
import * as yup from 'yup';
import { Formik, Field } from 'formik'
import {RFPercentage,RFValue} from "react-native-responsive-fontsize"
import { AntDesign } from '@expo/vector-icons';
import app from "../../firebase"
import {createUserWithEmailAndPassword,getAuth,deleteUser,updateProfile,sendEmailVerification, signOut} from "firebase/auth"
import {doc,setDoc,getFirestore, addDoc, serverTimestamp} from "firebase/firestore"
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
import Toast from 'react-native-root-toast'
export default function Register({navigation}) {
  const auth=getAuth(app)
  const db=getFirestore(app)
  const [loading,setloading]=React.useState(false)
    const {colors}=useTheme()
    //schema for signup frontend validation
    const signUpValidationSchema = yup.object().shape({
      fullName: yup
        .string()
        .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .required('Full name is required'),
      email: yup
        .string()
        .email("Please enter valid email")
        .required('Email is required'),
      password: yup
        .string()
        .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
         })
    //ends yup
   //function for signup
         const registration=async(values)=>{
          const{email,password,fullName}=values
          setloading(true)
          try{
             const useradded= await createUserWithEmailAndPassword(auth,email,password)
              await setDoc(doc(db,"users",useradded.user.uid),{
                userid:useradded.user.uid,
                username:fullName,
                email:email,
                active:true,
                ispublic:true,
                timestamp:serverTimestamp()
              })
              await setDoc(doc(db,"reports",useradded.user.uid),{
                userid:useradded.user.uid,
                blockusers:[],
                timestamp:serverTimestamp()
              })
              await setDoc(doc(db,"following",useradded.user.uid),{
                userid:useradded.user.uid,
                followings:[],
                timestamp:serverTimestamp()
              })
              await setDoc(doc(db,"followers",useradded.user.uid),{
                userid:useradded.user.uid,
                followers:[],
                timestamp:serverTimestamp()
              })
              let toast = Toast.show("Signup done", {
                duration: Toast.durations.LONG,
              });
              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 1000);
              setloading(false)
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
   //ends signup function
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
          fullName: '',
          email: '',
          password: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={values => registration(values)}
      >
        {({ handleSubmit, isValid }) => (
          <>
            <Field
              component={CustomInput}
              name="fullName"
              placeholder="Full Name"
            />
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
              <Text style={{color:colors.white,textAlign:"center",fontSize:RFPercentage(2),fontWeight:"bold"}}>Sign up</Text>
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
         {hasError && <View style={{backgroundColor:"white",padding:RFPercentage(1),width:"90%"}}><Text style={styles.errorText}>{errors[name]}</Text></View>}
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
