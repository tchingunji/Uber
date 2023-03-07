import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import {MaterialIcons} from '@expo/vector-icons';
import ModalDriver from '../components/Modal-driver';


export default function Home ({navigation,route})
{
  const{id,name,email,num}=route.params;
  const mapEl=useRef(null);
  const [origin, setOrigin]=useState(null);
  const[destination,setDestination]=useState(null);
  const[distance, setDistance]=useState(null);
  const[price, setPrice]=useState(null);
  const[priceEx, setPriceEx]=useState(null);
  const[marker,setMarker]=useState([]);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const [driver,setDriver]=useState(null);

  const dataMarker=[
    {
      key:1,
      latitude : -8.92350, 
      longitude:13.18841,
      name:'Tchingunji dos Santos Inácio',
      genero:'Masculino',
      dataNasc:'1999/06/26',
      marca: "Hyundai",
      modelo: "Sonata",
      matricula: "Ld-24-44-HU",
      numLugar: "3",
      tipo: "particular",
      classe: "Economica",
      numero:"948050181",
      email:"tchingunji@gmail",
    },
    {
      key:2,
      latitude:-8.91501568532175, 
      longitude:13.185491743926422,
      name:'Gloria Tchingunji Inácio',
      genero:'Femnino',
      dataNasc:'2012/11/26',
      marca: "Mitshubichi",
      modelo: "Pajero",
      matricula: "Ld-50-45-HL",
      numLugar: "5",
      tipo: "Familiar",
      classe: "Executivo",
      numero:"923343936",
      email:"Gtchingunji@gmail",
    },
    {
      key:3,
      latitude:-8.910606900232638, 
      longitude:13.199954444674301,
      name:'José dos Santos Inácio',
      genero:'Masculino',
      dataNasc:'2002/04/20',

      marca: "Kia",
      modelo: "Morning",
      matricula: "Ld-20-01-HU",
      numLugar: "3",
      tipo: "particular",
      classe: "Economica",
      numero:"996877632",
      email:"josehugoinacio@gmail.com@gmail",
    },
    {
      key:4,
      latitude: -8.891907906724235, 
      longitude: 13.185572112392014,
      
      name:'Joel Castelo Inácio',
      genero:'Masculino',
      dataNasc:'2015/04/05',

      marca: "Toyota",
      modelo: "Land Cruizer",
      matricula: "Ld-12-12-HB",
      numLugar: "5",
      tipo: "Familiar",
      classe: "Executivo"
    }
  ]
  const handleNewMarker=(coordinates)=>{
    setMarker([...marker,coordinates]);
  };

  useEffect( ()=>{
    (async function(){      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Permissão de Localização negada');
        return;
      }
      setMarker(dataMarker);
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421,
      });
      
    })();
  },[] );

  return (
    <View style={ styles.container }>
      <MapView style={ styles.map }
      initialRegion={origin}
      showsUserLocation={true}
      loadingEnabled={true}
      ref={mapEl}
      onPoiClick={(e)=>{
        console.log(e.nativeEvent.coordinate);
        setDestination({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude, 
        });
      }}
      onPress={(e)=>{
        console.log(e.nativeEvent.coordinate);
        setDestination({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude, 
        });
      }}
      >
        {marker.length>0 &&
          marker.map((m)=>{
            return <Marker  coordinate={m} key={m.key} icon={require('../assets/taxi.png')} onPress={()=>{ setDriver(m); setIsModalOpen(!isModalOpen)}}/>;
          })
        }

      {destination &&
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey= '###################################################'
            strokeWidth={3}            
            strokeColor="#07CD52"
            onReady={result=>{
              setDistance(result.distance);
              setPrice(result.distance*0.5);
              setPriceEx(result.distance);
              mapEl.current.fitToCoordinates(
                result.coordinates,{
                  edgePadding:{
                    top:50,
                    bottom:50,
                    left:50,
                    right:50                  
                  }
                }
              )              
            }}
        />
      }
      </MapView>
      <View style={ styles.search }>
        <View style={{ flex: 1}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Profile")}>
          <Image style={styles.ImageStyle} source={require('../assets/menu.png')} />
          </TouchableOpacity>
        </View>
        
        <View  style={[styles.ViewSearch,{ flex: 7}]}>
          <View>
              <GooglePlacesAutocomplete
                placeholder={'Aonde vamos '+name.split(' ')[0]+ ' 😁'}
                query={{
                  key: '#######################################################################',
                  language: 'pt-br',
                  components:'country:ao'  ,       
                }}
                onPress={(data, details = null) => {
                  setDestination({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta:0.02,
                    longitudeDelta:0.000421,
                  });
                }  }
                enablePoweredByContainer={false}
                fetchDetails={true}
                styles={{listView:{height:100}, textInput:styles.input}}        
              />
        </View>
        
        <View>
              {distance &&
                <View style={styles.block}>
                  <Text style={styles.price}><MaterialIcons name='payment' size={24} color="#07CD52" style={styles.icons}/> {price.toFixed(3)} AO</Text>
                  <Text style={styles.distance}><MaterialIcons name='directions-car' size={24} color="#055E9F" style={styles.icons}/> {distance.toFixed(2).replace(".",",")} Km</Text>        
                </View>
              }
              {distance &&
                <View>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Chamar Motorista</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button} onPress={() => {setDistance(null);setDestination(null)}}>
                    <Text style={styles.buttonText}>Limpar</Text>
                  </TouchableOpacity>

                </View>
              }
        </View>
 
      </View>
      </View>
      <ModalDriver isModalOpen={isModalOpen} isDarkMode={false} setIsModalOpen={setIsModalOpen} driver={driver}/>
    </View>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',    
    alignItems:"center",
    justifyContent: 'center',
  },
  ViewSearch:{
    backgroundColor:"#fff",
    opacity: 0.8,
    shadowColor:"#000",
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowOpacity:0.5,
    shadowRadius:4,
    elevation:4,
    padding:8,
    borderRadius:8,
  },
  map:{
    height:Dimensions.get("window").height,
    width:Dimensions.get("window").width,
  },
  search:{
    position:"absolute",
    width:"90%",
    top:Constants.statusBarHeight+5,
    flexDirection:"row",
    flex:1,
  },
  input:{
    borderColor:"#888",
    borderWidth:1,
  },
  button:{
    backgroundColor:"#FFD501",
    paddingVertical:12,
    marginTop:16,
    borderRadius:4,
  },
  buttonText:{
    textAlign:"center",
    color:"#000",
    fontWeight:"bold",
    
  },
  block:{
    flexDirection:"row",    
    padding:4,    
  },
  price:{
    marginRight:15,
    fontSize:20,    
  },
  distance:{    
    fontSize:20,
  },
  icons:{
    marginBottom:25,    
  },
  ImageStyle:{
    marginRight:5,
    marginTop:10,
    resizeMode:"contain",    
  },
} );
