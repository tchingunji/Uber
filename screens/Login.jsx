import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Separator} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '../constants';
import {Display} from '../utils';

import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../src/config/firebase';

const Login = ({navigation}) => {
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [password, setPassword] = useState({1: '', 2: '', 3: '', 4: ''});
  const [email,setEmail]=useState("cristec@tch.inacio")
  const [smsError,setSmsError]=useState(null);

  const login = () => {
    
    setSmsError(null);
      const senha = (password[1]+ password[2]+ password[3]+ password[4])+'cristec';
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          navigation.navigate("Home",{user})
          console.log(user);
        })
        .catch((error) => {
          setSmsError("falhou")
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}         
        />
        <Text style={styles.headerTitle}>Entrar</Text>
      </View>
      {smsError &&
        <Text style={styles.title}>Dados errados, tente novamente</Text>
      }
      <Text style={styles.content}>
        Entre com o código de{' '}
        <Text style={styles.phoneNumberText}>Login</Text>
      </Text>
      <View style={styles.otpContainer}>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={text => {
              setPassword({...password, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onChangeText={text => {
              setPassword({...password, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onChangeText={text => {
              setPassword({...password, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </View>
        <View style={styles.otpBox}>
          <TextInput
            style={styles.otpText}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onChangeText={text => {
              setPassword({...password, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.signinButton} onPress={()=>login()}>
        <Text style={styles.signinButtonText}>Verificar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color:"#f00"
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  phoneNumberText: {
    fontSize: 18,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_YELLOW,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: Colors.DEFAULT_YELLOW,
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    color: Colors.DEFAULT_YELLOW,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  signinButton: {
    backgroundColor: Colors.DARK_ONE,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,    
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
});

export default Login;