import * as React from 'react';
import {Text, Modal, View, Button, Switch} from 'react-native';

export default function ModalDriver({isModalOpen, isDarkMode, setIsModalOpen, driver}) {
  const [switch1, setSwitch1] = React.useState(false);
  const [switch2, setSwitch2] = React.useState(false);
  const [switch3, setSwitch3] = React.useState(false);

  const modalOptions = [
    {
      title: '💡 Tips',
      value: switch1,
      setSwitch: setSwitch1,
    },
    {
      title: '🌕 Set dark mode',
      value: switch2,
      setSwitch: setSwitch2,
    },
    {
      title: '✈️ Airplane mode',
      value: switch3,
      setSwitch: setSwitch3,
    },
  ];

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'flex-end',
  };
  const modalStyle = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };
  const titleStyle = {
    color: isDarkMode ? 'white' : 'black',
    fontSize: 20,
    fontWeight: 'bold',
  };
  const optionTextStyle = {
    fontSize: 18,
    fontWeight: '500',
    color: isDarkMode ? 'white' : 'black',
  };
  const textLeft={
    fontSize: 18,
    textAlign:'left',
    fontWeight: '500',
    color: isDarkMode ? 'white' : 'black',
  };
  const optionContainer = {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5 ,
  };

  return (
    <>
      <Modal visible={isModalOpen} transparent={true} animationType={'slide'}>
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <Text style={titleStyle}>Dados do Motorista</Text>             

            <View style={optionContainer} key={driver?.key}>
                <Text style={optionTextStyle}>{driver?.name.split(' ')[0]}</Text> 
                <Text style={textLeft}>{driver?.marca}</Text>               
            </View>
            
            <View style={optionContainer}>
                <Text style={optionTextStyle}>{driver?.genero}</Text>
                <Text style={textLeft}>{driver?.modelo}</Text>
            </View>

            <View style={{flexDirection:"row"}}>
                <Button
                title="Chamar Motorista"
                onPress={() => {console.log(driver);setIsModalOpen(false)}}
                />
                <Button
                title="Fechar"
                onPress={() => {console.log(driver);setIsModalOpen(false)}}
                />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}