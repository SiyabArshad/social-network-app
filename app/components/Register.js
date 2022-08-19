import * as React from 'react'
import { View, KeyboardAvoidingView,Text,StyleSheet,TextInput,SafeAreaView,Button,TouchableOpacity } from 'react-native'
import {useTheme} from "@react-navigation/native"
import * as yup from 'yup';
import { Formik, Field } from 'formik'
import {RFPercentage,RFValue} from "react-native-responsive-fontsize"
import { AntDesign } from '@expo/vector-icons';
export default function Register() {
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
          //code
          try{

          }
          catch{

          }
         }
   //ends signup function
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
