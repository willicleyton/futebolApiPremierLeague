import { StyleSheet } from 'react-native';
import TableScreen from './Screens/TableScreen';
import MatchScreen from './Screens/MatchScreen';
import DayChoiceScreen from './Screens/DayChoiceScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

function MatchScreenStack() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={() => ({headerShown: false})}>
      <Stack.Screen name="DayChoiceScreen" component={DayChoiceScreen}/>
      <Stack.Screen name="MatchScreen" component={MatchScreen} />
    </Stack.Navigator> 
  )
}


export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer >
      <Tab.Navigator
        initialRouteName='TableScreen'
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            color: "black",
            fontSize: 15,
          },
          tabBarStyle: [
            {
              backgroundColor: "white",
              borderTopColor: "lightgrey",
              position: "absolute",
              height: 80,
              paddingBottom: 30,
              ...styles.shadow,},
            null,
          ],
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Table") {
              iconName = focused ? "menu" : "menu-outline"
            } else if (route.name === "Matchday") {
              iconName = focused ? "football" : "football-outline"
            }   
            return (
              <Ionicons
                name={iconName}
                size={30}
                color={"black"}
                style={styles.icon}
              />
            );
          }
        })}
      >
        <Tab.Screen name="Table" component={TableScreen} />
        <Tab.Screen name="Matchday" component={MatchScreenStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // shadow: {
  //   shadowColor: "black",
  //   shadowOffset: {
  //     width: 0,
  //     height: 0,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 10,
  //   elevation: 5
  // },
  icon: {
    marginTop: 5,
  }
});
