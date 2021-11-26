import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image  } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
//redux imports 
import { selectBaseCurrency, selectQuoteCurrency, selectBaseValue, selectQuoteValue, reverseCurrencies, selectConversionRate, selectTheme, getAllCurrenciesFromAPI, getConversionRateForBaseCurrency} from './changeBaseCurrency';


export default function Home({ navigation }) {
    const baseCurrency= useSelector(selectBaseCurrency);
    const quoteCurrency = useSelector(selectQuoteCurrency);
    const baseValue = useSelector(selectBaseValue);
    const quoteValue = useSelector(selectQuoteValue);
    const conversionRate = useSelector(selectConversionRate);
    const theme = useSelector(selectTheme)

    const [localBaseValue, setBaseValue] = useState(baseValue); 
    const [localQuoteValue, setQuoteValue] = useState(quoteValue); 
    
    //Months for Date
    const months = ["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dispatch = useDispatch();

    //dispatch(getAllCurrenciesFromAPI()); 
    //dispatch(getConversionRateForBaseCurrency(baseCurrency, quoteCurrency));
  
   console.log("Home component", "Base Currency from Store", baseCurrency, "rate from store", conversionRate);
    let todayDate = new Date();

  return (
    <View style={{
        flex: 1,
        backgroundColor: theme.hexCode,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity style={{
         position: 'absolute',
         right: 5,
         top: 5,
      }} onPress={() => navigation.navigate('Settings') }>
      <Icon
          name='cog'
          size={25}
          color='#ffffff'
          style={{height:25,width:25}}/>
      </TouchableOpacity>
      <Image
          source={require('./logo.png')} 
          style={{ width: 150, height: 150, margin:12 }}
      />
      <Text style={styles.title} >Currency Converter</Text>
      <View style={{ flexDirection:'row',  margin:12 }}>
        <TouchableOpacity style={styles.currencyButton} onPress={() =>
        
        navigation.navigate('CurrencyList', {"currencyType": "base", "currency": baseCurrency})
      }>
          <Text style={{color: theme.hexCode,  fontWeight: 'bold'}}> {baseCurrency}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.base}
          value={localBaseValue}
          placeholder="Base Currency"
          keyboardType="numeric"
          onChangeText={
              (text)=> {
                console.log(typeof text);
                setBaseValue(text);
                console.log("baseValue", localBaseValue)
                setQuoteValue((text*conversionRate).toString());
              }
          }
          
        />
      </View>
      <View style={{ flexDirection:'row', margin:12 }}>
        <TouchableOpacity style={styles.currencyButton} onPress={() =>
        
        navigation.navigate('CurrencyList',  {"currencyType": "quote", "currency": quoteCurrency})
      }>
          <Text style={{color:theme.hexCode, fontWeight: 'bold'}} > {quoteCurrency}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quote}
          value={localQuoteValue}
          placeholder="Quote Currency"
          keyboardType="numeric"
          onChangeText={
            (text)=> {
              setQuoteValue(text);
              setBaseValue((text/conversionRate).toString());
            }
        }
        />
      </View>
      <Text style={{color:"#ffffff", margin:12}}>
        1 {baseCurrency} = {conversionRate} {quoteCurrency} as of {(months[todayDate.getMonth()]) + " " + todayDate.getDate() + ", " +  todayDate.getFullYear()}
      </Text>
      <TouchableOpacity 
        style={{
            backgroundColor: theme.hexCode,
            flexDirection: 'row'
          }}
        onPress={() => {
            setBaseValue(localQuoteValue);
            setQuoteValue(localBaseValue);
            dispatch(reverseCurrencies());
        }}>
      <Ionicons
          name='sync'
          size={15}
          color='#ffffff'/>
          <Text style={{color:'#ffffff'}}> Reverse Currencies</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  title:{
    color: 'white', 
    fontSize: 20, 
    fontWeight: 'bold'
  }, 
  base: {
    height: 40,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopRightRadius:5,
    borderBottomRightRadius: 5, 
  }, 
  quote: {
    height: 40,
    padding: 10,
    backgroundColor: '#ffffff',
    borderTopRightRadius:5,
    borderBottomRightRadius: 5, 
  }, 
  currencyButton: {
    backgroundColor: '#ffffff',
    borderColor: "#d3d3d3",
    height: 40,
    alignItems: "center",
    padding: 10, 
    borderTopLeftRadius:5,
    borderBottomLeftRadius: 5, 
    borderWidth: 1,
  }, 
});
