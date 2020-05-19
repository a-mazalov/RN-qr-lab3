import React, { Component } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import Header from '../components/Header'
import { Item, Text, Button } from 'native-base'
// import QRCode from 'react-qr-code';
import SvgQRCode from 'react-native-qrcode-svg'
// import { QRCode } from 'react-native-custom-qr-codes-expo';
export class ShowScreen extends Component {

    static navigationOptions = {
        header: null
    }

    backFunction = () => {
        this.props.navigation.goBack()
	}
	
    render() {
        return(
            <View>
                <Header name={this.props.navigation.getParam('name')} f={this.backFunction}/>
                <StatusBar barStyle='light-content' />
                <Text style={styles.text}>
                    <Text style={styles.textBold}>Имя: </Text>
                    {this.props.navigation.getParam('name')}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.textBold}>Телефон: </Text>
                    {this.props.navigation.getParam('phone')}
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.textBold}>Сайт: </Text>
                    {this.props.navigation.getParam('site')}
				</Text>
				<View style={styles.qr}>
					{/* <QRCode value={this.props.navigation.getParam('name')} /> */}
					{/* <SvgQRCode value={this.userInfo}/> */}
					<SvgQRCode
						value={JSON.stringify({
							name: this.props.navigation.getParam('name'),
							phone: this.props.navigation.getParam('phone'),
							site: this.props.navigation.getParam('site')
						})}
					/>
				</View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: '#21252b',
        margin: 15
    },
    textBold: {
        fontSize: 20,
        color: '#21252b',
        margin: 15,
        fontWeight: "500"
	},
	qr: {
		padding: 20,
		textAlign:"center"
	}
})
export default ShowScreen