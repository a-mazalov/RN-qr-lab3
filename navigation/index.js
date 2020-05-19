import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen'
import AddScreen from '../screens/AddScreen'
import ShowScreen from '../screens/ShowScreen'
import QrScreen from '../screens/QrScreen'

const StackNav = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		AddTask: {
			screen: AddScreen
		},
		ShowScreen: {
			screen: ShowScreen
		},
		QrScreen: {
			screen: QrScreen
		}
	}
)

const RootNavigator = createAppContainer(StackNav)

export default RootNavigator