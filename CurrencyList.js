import React, {useState} from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Icon} from 'react-native';

import IconInstance from 'react-native-vector-icons/FontAwesome';

//redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { changeBaseCurrency, changeQuoteCurrency, selectAllCurrencies} from './changeBaseCurrency'

const getCurrencies = async () => {
    try {
    // const response = await fetch('http://api.exchangeratesapi.io/v1/latest?access_key=6cb91471afd36f3afa36b4ab3a8c18df');
    // const json = await response.json();
    const json = {
        "success": true,
        "timestamp": 1519296206,
        "base": "EUR",
        "date": "2021-03-17",
        "rates": {
            "AUD": 1.566015,
            "CAD": 1.560132,
            "CHF": 1.154727,
            "CNY": 7.827874,
            "GBP": 0.882047,
            "JPY": 132.360679,
            "USD": 1.23396,
        }
    }

    const currencies = {
        "success": true,
        "symbols": {
          "AED": "United Arab Emirates Dirham",
          "AFN": "Afghan Afghani",
          "ALL": "Albanian Lek",
          "AMD": "Armenian Dram",
          }
    }

    const myCurrencies = Object.keys(currencies.symbols);
    return myCurrencies;
   } catch (error) {
     console.error(error);
   }

}



//const allCurrencies =   ["USD", "PKR", "INR", "CAD", "EUR", "GBP", "YEN"];// getCurrencies();

const Item = ({ title, iconColor, onPress }) => (
     
    <View style={styles.item}>
        <TouchableOpacity style={{
            flexDirection: 'row', 
            flex:1,
            width: '100%', 
        }} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <IconInstance
          name='check'
          size={30}
          color={iconColor}/>
        </TouchableOpacity>
    </View>
);

export default function ListCurrencies({route}) {
    
    
    const {currencyType, currency} = route.params;
    const [selectedCurrency, setSelectedCurrency] = useState(currency);

    const allCurrencies = useSelector(selectAllCurrencies); 
    const dispatch = useDispatch();



    const renderItem = ({ item }) => {
       const iconColor = item === selectedCurrency ? 'black' : 'white';
       return (
        <Item 
            title={item} 
            iconColor = {iconColor}
            onPress={() => {
                setSelectedCurrency(item);
                currencyType == "base" ? dispatch(changeBaseCurrency(item)): dispatch(changeQuoteCurrency(item));
            }}
        />)
    };

    return (
    <View style={styles.container}>
     <FlatList
          data={allCurrencies}
          renderItem={renderItem}
          extraData = {selectedCurrency}
          style={{
            flex:1, 
            width: '100%', 
            backgroundColor: '#ffffff', 
            
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#516d79',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderBottomWidth: 1,
    flex:1, 
  },
  title: {
    fontSize: 15,
    flex:1
  },
});
