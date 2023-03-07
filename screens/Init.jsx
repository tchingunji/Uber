import { StyleSheet, Text, View,TouchableOpacity,Image, TextInput, ScrollView} from 'react-native';

//TELA 1
export default function Init({navigation}) {
  return (
    <View style={styles.mainView}>
      <View style={styles.TopView}>
        <Image style={styles.ImageStyle} source={require('../assets/minilogo.jpeg')} />
      </View>
      <ScrollView style={styles.BottomView}>
       <View style={styles.FormView}>                
          <Image style={styles.ImageStyle} source={require('../assets/carro.png')} />
          <Text style={styles.info}>
              É um facto estabelecido de que um leitor é distraído pelo conteúdo legível de uma página quando analisa a sua mancha gráfica. Logo, o uso de Lorem Ipsum leva a uma distribuição mais
          </Text>

          <TouchableOpacity style={styles.Button}  /*onPress={() => navigation.navigate('Home',{   id:123,
                                                    name:'Tchingunji dos Santos Inácio',
                                                    email:'tchingunji@gmail.com',
                                                    num:'923343936',
                                                    })}*/
                                                    onPress={() => navigation.navigate('Login')}       >
            <Text  style={styles.ButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button2}  onPress={() => navigation.navigate('Create')}>
            <Text  style={styles.ButtonText2}>Criar conta</Text>
          </TouchableOpacity>

        </View>        
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView:{
    backgroundColor:"#fff",
    marginTop:40,
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
  },
  TopView:{
    width:"100%",
    height:"30%",
    marginBottom:60,    
  },
  BottomView:{
    width:"100%",
    height:"70%",
    backgroundColor:"#000",
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  },
  ImageStyle:{
    width:"90%",
    resizeMode:"contain",
    alignSelf:"center",
    
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
  Button2:{
    width:"90%",    
    height:45,
    backgroundColor:"#000",
    borderRadius:10,
    marginTop:20,
    borderColor:"#fff",
    borderWidth:1,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:10,
  },
  ButtonText2:{
    fontWeight:"bold",
    fontSize:15,
    color:"#fff",
  },
  ButtonText:{
    fontWeight:"bold",
    fontSize:15,        
    color:"gray"
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
  },
  info:{
    textAlign:"center",
    color:"#fff",
    margin:5,
  }
});
