import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// class AddScreen extends Component
export default function QrScreen(props) {

  const { navigation } = props;

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
	setScanned(true);
	// let obj = {
	// 	name: 'Alexander',
	// 	phone: '435345',
	// 	site: 'bsuir.com'
	//   }
	  try {
		  let parsedData = JSON.parse(data);
		  navigation.state.params.saveItem(parsedData);

		  alert(`Контакт ${parsedData.name} добавлен`);
	  } catch {
		alert('Ошибка чтения контакта. Неверный QR-code');
	  }

  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={'Сканировать еще раз'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}