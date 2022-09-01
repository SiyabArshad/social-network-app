import * as React from 'react'
import { View, Text,StyleSheet,TextInput,SafeAreaView,Button,TouchableOpacity } from 'react-native'
import {useTheme} from "@react-navigation/native"
import * as yup from 'yup';
import { Formik, Field } from 'formik'
import {RFPercentage,RFValue} from "react-native-responsive-fontsize"
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default function Otp() {
    const {colors}=useTheme()
    //schema for otp frontend validation
    const otpValidationSchema = yup.object().shape({
      otpcode: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
        .required('Otp is required'),
         })
    //ends yup
   //function for forgot
         const forgotfunction=async(values)=>{
          //code
          try{

          }
          catch{

          }
         }
   //ends signin function
    return (
      <Formik
        initialValues={{
          code: '',
        }}
        validationSchema={otpValidationSchema}
        onSubmit={values => forgotfunction(values)}
      >
        {({ handleSubmit, isValid }) => (
          <>
           
            <Field
              component={CustomInput}
              name="otpcode"
              placeholder="Otp code"
              keyboardType="numeric"
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
              <Text style={{color:colors.white,textAlign:"center",fontSize:RFPercentage(2),fontWeight:"bold"}}>Verify</Text>
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
