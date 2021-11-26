import React, {useState} from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, Text} from "react-native";


import PropTypes from "prop-types";

import IconInstance from "react-native-vector-icons/FontAwesome";

//redux stuff
import { useDispatch, useSelector } from "react-redux";
import { changeBaseCurrency, changeQuoteCurrency, selectAllCurrencies} from "./changeBaseCurrency";

const Item = ({ title, iconColor, onPress }) => (
     
    <View style={styles.item}>
        <TouchableOpacity style={{
            flexDirection: "row", 
            flex:1,
            width: "100%", 
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
       const iconColor = item === selectedCurrency ? "black" : "white";
       return (
        <Item 
            title={item} 
            iconColor = {iconColor}
            onPress={() => {
                setSelectedCurrency(item);
                currencyType == "base" ? dispatch(changeBaseCurrency(item)): dispatch(changeQuoteCurrency(item));
            }}
        />);
    };

    return (
    <View style={styles.container}>
     <FlatList
          data={allCurrencies}
          renderItem={renderItem}
          extraData = {selectedCurrency}
          style={{
            flex:1, 
            width: "100%", 
            backgroundColor: "#ffffff", 
            
        }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#516d79",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1,
    flex:1, 
  },
  title: {
    fontSize: 15,
    flex:1
  },
});

Item.propTypes = {
    onPress:PropTypes.func.isRequired,
    title: PropTypes.string.isRequired, 
    iconColor: PropTypes.string.isRequired
};

ListCurrencies.propTypes =  {
    route: PropTypes.shape({
      params: PropTypes.shape({
        currencyType: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired,
  };