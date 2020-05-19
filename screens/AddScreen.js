import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Form, Item, Input, Button, Text as NBText } from 'native-base'
import Header from '../components/Header'

export class AddScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        text: '',
        name: '',
        phone: '',
        site: ''
    }

    onChangeText = event => {
        const {name, phone, site} = this.state;
        this.setState({ name: name, phone: phone, site: site})
    }

    backFunction = () => {
        this.props.navigation.goBack()
    }

    onAddTask = () => {
        let regexpName = /^[A-zА-яЁё_ ]+$/;
        let regexpPhone = /^[0-9]+$/;
        let regexpSite = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Zа-яА-Я0-9@:%_\+.~#?&//=]*)?/gi;
        if(regexpName.test(this.state.name)) {
            if(regexpPhone.test(this.state.phone)) {
                if(regexpSite.test(this.state.site)) {
                    let obj = {
                        name: this.state.name,
                        phone: this.state.phone,
                        site: this.state.site
                    }
                    this.props.navigation.state.params.saveItem(obj)
                    this.props.navigation.goBack()
                } else {
                    alert('Неверный сайт')
                }
            } else {
                alert('Неверный номер')
            }
        } else {
            alert('Неверное ФИО')
        }

    }

    render() {
        return (
            <View>
                <Header name={'Добавить'} f={this.backFunction}/>
                <StatusBar barStyle='light-content' />
                <View style={{ marginRight: 10, marginTop: 25 }}>
                    <Form>
                        <Item>
                            <Input
                            value={this.state.task}
                                placeholder='ФИО'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                onChangeText={name => this.setState({name})}
                                returnKeyType={'done'}
                            />
                        </Item>
                        <Item>
                            <Input
                            value={this.state.task}
                                placeholder='Телефон'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                keyboardType="numeric"
                                onChangeText={phone => this.setState({phone})}
                                returnKeyType={'done'}
                            />
                        </Item>
                        <Item>
                            <Input
                            value={this.state.task}
                                placeholder='Веб сайт'                                
                                autoFocus
                                clearButtonMode='always'
                                autoCorrect={false}
                                keyboardType="url"
                                onChangeText={site => this.setState({site})}
                                returnKeyType={'done'}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        style={{ backgroundColor: '#21252b', margin: 25, justifyContent: 'center' }}
                        onPress={this.onAddTask}
                    >
                        <NBText style={{ fontWeight: 'bold' }}>Добавить</NBText>
                    </Button>
                </View>
            </View>
        )
    }
}


export default AddScreen