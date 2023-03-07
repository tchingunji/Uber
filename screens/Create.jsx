import { StyleSheet, Text, View,TouchableOpacity,Image, TextInput, ScrollView} from 'react-native';
import { useState } from 'react';
import {  auth, storage} from '../src/config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { Avatar} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function Create({navigation}) {
  
  const[fullName,setFullName]=useState("");
  const[emails,setEmail]=useState(null);
  const[phone,setPhone]=useState(0);
  const[code,setCode]=useState("");
  const[confirm, setConfirm]=useState("");
  const [smsError,setSmsError]=useState(null);
  const [image, setImage]=useState(null);
  const[uploading, setUploading]=useState(false);
  
  const pickImage = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,4],
      quality:1,
    });

    const source = {uri: result.uri};
    console.log(source);
    setImage(source);
  }
  
  function createUser(){
     let emailtxt="";
    emailtxt = emails;

    
    createUserWithEmailAndPassword(auth, emailtxt, code+"cristec")
    .then((userCredential) => {
      
      const user = userCredential.user;      
      const createCount = setDoc(doc(db, "passageiros", user.uid), {
        nome: fullName,
        email: email+"",
        numero:phone,
        code:code,
      });
      createCount;
    })
    .catch((error) => {
      
      setSmsError("Impossivel criar conta");
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(email);
      // ..
    });
  }

 
  
  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image style={styles.ImageStyle} source={require('../assets/motorista.jpg')} />
      </View>
      <ScrollView style={styles.BottomView}>
       <View style={styles.FormView}>          
          <Text style={styles.Heading}>Criar conta</Text>
          <View>
            {image && <Avatar.Image source={{uri: image.uri}} size={180} />
            }
            <TouchableOpacity onPress={pickImage} style={[styles.Button,{padding:10,alignSelf:"center"}]}>
              <Text style={styles.ButtonText}>Pegar uma Imagem</Text>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.TextInput} placeholder="Nome completo" placeholderTextColor={"#fff"} value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.TextInput} placeholder="Email" placeholderTextColor={"#fff"} keyboardType="email-address" value={emails} onChangeText={setEmail}/>
          <TextInput style={styles.TextInput} placeholder="Telefone" placeholderTextColor={"#fff"} value={phone} onChangeText={setPhone} keyboardType="numeric"/>
          
          <TextInput style={styles.TextInput} placeholder="Código de acesso" placeholderTextColor={"#fff"} secureTextEntry={true} keyboardType="numeric" value={code} onChangeText={setCode}/>
          <TextInput style={styles.TextInput} placeholder="Confirmar código de acesso" placeholderTextColor={"#fff"} secureTextEntry={true} keyboardType="numeric" value={confirm} onChangeText={setConfirm}/>
          <TouchableOpacity style={styles.Button}  onPress={() => createUser()}>
            <Text  style={styles.ButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>        
        <TouchableOpacity style={styles.TextButton}  onPress={() => navigation.goBack()}>
            <Text  style={styles.Voltar}>Volta</Text>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
//navigation.navigate('Confirmation')
const styles = StyleSheet.create({
  mainView:{
    marginTop:40,
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  TopView:{
    width:"100%",
    height:"30%",
    marginBottom:10,    
  },
  BottomView:{
    width:"100%",
    height:"70%",
    backgroundColor:"#000",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  ImageStyle:{
    width:"60%",
    resizeMode:"contain",
    alignSelf:"center",
    marginBottom:10,
  },
  Heading:{
    color:"#fff",
    fontSize:40,
    fontWeight:"bold",
    marginLeft:30,    
    marginTop:25,
    alignSelf:"flex-start"
  },
  FormView:{
    width:"100%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:30,
  },
  TextInput:{
    width:"90%",
    borderWidth:1,
    borderColor:"#fff",
    height:52,
    borderRadius:10,
    padding:5,
    marginTop:20,
    color:"#FEC901",
    fontSize:20,
  },
  Button:{
    width:"90%",
    color:"#000",
    height:45,
    backgroundColor:"#fff",
    borderRadius:10,
    marginTop:20,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    
  },
  ButtonText:{
    fontWeight:"bold",
    fontSize:18,    
    
  },
  Voltar:{
    color:'gray',
    marginBottom:50,
  },
  TextButton:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    marginTop:20,
  }
});
