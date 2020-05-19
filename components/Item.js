import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, Clipboard } from 'react-native'
import { Icon } from 'native-base'

const { width } = Dimensions.get('window')

const Item = ({ nameT, phoneT, siteT, id, deleteTodo, clickItem  }) => {

    // clipboardItem = () => {
    //     Clipboard.setString(nameT + '\n' + phoneT + '\n' + siteT)
    //     Alert.alert('Сообщение', 'Данные скопированны')
    // }

	return (
		<View style={styles.container}>
			<View style={styles.rowContainer} >
				{/* <Text style={styles.text} onPress={() => clickItem({name: nameT, phone: phoneT, site: siteT})} onLongPress={this.clipboardItem}> */}
				<Text style={styles.text} onPress={() => clickItem({name: nameT, phone: phoneT, site: siteT})} >
					{nameT}
				</Text>
			</View>
			<TouchableOpacity onPressOut={() => deleteTodo(id)}>
				<Icon name='md-trash' style={{ color: '#21252b', paddingRight: 15 }} />
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		borderBottomColor: '#21252b',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	text: {
		color: '#21252b',
        fontSize: 18,
        fontWeight: "400",
        paddingVertical: 20,
        width: width / 0.2,
        height: 60,
        paddingLeft: 10
	},

	rowContainer: {
		flexDirection: 'row',
		width: width / 2,
        alignItems: 'center',
        height: 60
	}
})

export default Item