import React from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { changeTheme} from "./changeBaseCurrency";



const DATA = [
    {
      id: "1",
      title: "Blue",
      colorHex: "#339DFF"
    },
    {
      id: "2",
      title: "Orange",
      colorHex: "#FFBF00"
    },
    {
      id: "3",
      title: "Green",
      colorHex: "#4CAA88"

    },
    {
        id: "4",
        title: "Purple",
        colorHex: "#725495"
    },
    {
        id: "5", 
        title: "Gray", 
        colorHex: "#516d79"
    }
];



const Item = ({ title, color, onPress }) => (
    <View style={styles.item}>
        <TouchableOpacity style={{
            flexDirection: "row", 
            flex:1,
            width: "100%", 
        }} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <View style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            backgroundColor: color,
           
        }}/>
        </TouchableOpacity>
    </View>
  );

export default function Settings() {
    
    const dispatch = useDispatch();
    const renderItem = ({ item }) => (
        <Item title={item.title} color={item.colorHex} onPress={ () => dispatch(changeTheme(item)) }/>
    );
    
  return (
    <View style={styles.container}>
     <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
    backgroundColor: "#516d79",
    flex: 1, 
    alignItems: "center",
    justifyContent: "center",

  },
  item: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#F8F8F8",
    flex:1
  },
  title: {
    fontSize: 20,
    flex:1
  },
});


Item.propTypes = {
    onPress:PropTypes.func.isRequired,
    title: PropTypes.string.isRequired, 
    color: PropTypes.string.isRequired
};