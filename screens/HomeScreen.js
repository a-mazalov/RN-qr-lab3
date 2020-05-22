import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, StatusBar, AsyncStorage } from 'react-native'
import uuidv1 from 'uuid/v1'
import _values from 'lodash.values'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import Header from '../components/Header'
import Item from '../components/Item'
import FloatingButton from '../components/FloatingButton'
import { Button } from 'native-base'





export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        isDataReady: false,
		items: {},
		filter: 'Todo'
    }

	
    componentDidMount = () => {
        this.loadItems()
    }

    loadItems = async () => {
        try {
            await Font.loadAsync({
                Roboto: require('../node_modules/native-base/Fonts/Roboto.ttf'),
                Roboto_medium: require('../node_modules/native-base/Fonts/Roboto_medium.ttf')
            })

            const getItems = await AsyncStorage.getItem('labtwoitems')
			const parsedItems = JSON.parse(getItems)
			console.log(parsedItems);
            this.setState({ isDataReady: true, items: parsedItems || {} })
        } catch (err) {
            alert('Application Error. Cannot load data.')
        }
	}
	
	addTodo = item => {
		const newItem = item
		if(Object.keys(newItem).length !== 0) {
        	this.setState(prevState => {
        		const ID = uuidv1()
        		const newItemObject = {
        			[ID]: {
        				id: ID,
						name: newItem.name,
						phone: newItem.phone,
        				site: newItem.site
        			}
        		}
        		const newState = {
        			...prevState,
        			items: {
        				...prevState.items,
        				...newItemObject
        			}
        		}
        		this.saveItems(newState.items)
        		return { ...newState }
        	})
        }
	}

	deleteTodo = id => {
        this.setState(prevState => {
            const items = prevState.items
            delete items[id]
            const newState = {
                ...prevState,
                ...items
            }
            this.saveItems(newState.items)
            return { ...newState }
        })
	}

	clickItem = obj => {
		this.props.navigation.navigate('ShowScreen', {
			name: obj.name,
			phone: obj.phone,
			site: obj.site,
		})
    }

    saveItems = newItems => {
        const saveItems = AsyncStorage.setItem('labtwoitems', JSON.stringify(newItems))
	}

	onPressFab = () => {
        this.props.navigation.navigate('AddTask', {
            saveItem: this.addTodo
        })
	}

	onPressScan = () => {
        this.props.navigation.navigate('QrScreen', {
            saveItem: this.addTodo
        })
	}

    render() {

        const { isDataReady } = this.state

        if (!isDataReady) {
            return <AppLoading />
        }

		console.log(this.state.items)
		console.log(_values(this.state.items))

        return (
            <View style={styles.container}>
                <Header/>
                <StatusBar barStyle='light-content' />
                <FlatList
                    data={_values(this.state.items)}
                    contentContainerStyle={styles.content}
                    renderItem={row => {
                        return (
						<Item
						nameT={row.item.name}
						phoneT={row.item.phone}
						siteT={row.item.site}
						id={row.item.id}
						deleteTodo={this.deleteTodo}
						clickItem = {this.clickItem}
						alertF={this.alertF}
						/>
						)
                    }}
                    keyExtractor={item => item.id}
                />
				{/* <FloatingButton actionOnPress={this.onPressFab} /> */}

				<View style={{
					
					width: 380,
					height: 50,
					alignItems: 'flex-end',
					flexDirection: 'row',
				}}>
					<View style={{
						flex: 1,

						flexGrow: 50,
					}}>
						<Button onPress={this.onPressFab} style={{ flex: 1, borderRadius: 0, backgroundColor: '#1abc9c'}} title="Добавить">
							<Text style={{ textAlign: "center", width: 190, color: '#FFFFFF'}}>
								Добавить
							</Text>
						</Button>
					</View>
					<View style={{
						flex: 1,

						flexGrow: 50,
					}}>
						<Button onPress={this.onPressScan} style={{ flex: 1, borderRadius: 0, backgroundColor: '#34495e' }}>
							<Text style={{ textAlign: "center", width: 190,  color: '#FFFFFF' }}>
								Сканировать
							</Text>
						</Button>
					</View>
				</View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	content: {
		flex: 1,
		alignSelf: 'stretch'
	},
	contentHeader: {
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default HomeScreen