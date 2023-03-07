import Init from './screens/Init';
import Create from './screens/Create';
import Confirmation from './screens/Confirmation';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Login from './screens/Login'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack=createNativeStackNavigator();

export default function App ()
{
  return (    
      <NavigationContainer>
        <Stack.Navigator>         
          <Stack.Screen
            name='Init'
            component={Init}   
            options={{ headerShown: false }}
           />
           <Stack.Screen name="Create" component={Create} options={{ headerShown: false }}/>
           <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
           <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
           <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      
  );
}
