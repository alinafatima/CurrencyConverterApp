import { createSlice } from "@reduxjs/toolkit";
import { RATES_API_KEY} from "@env";

export const counterSlice= createSlice({
  name: "counter",
  initialState: {
    baseCurrency: "USD", 
    quoteCurrency: "GBP",
    baseValue: "0",
    quoteValue: "0", 
    conversionRate: "0.77208", 
    theme: {
        color: "gray",
        hexCode: "#516d79"
    }, 
    allCurrencies: ["USD", "PKR", "INR", "CAD", "EUR", "GBP", "YEN", "AED"],
  },
  reducers: {
    changeBaseCurrency: (state, action) => {
        state.baseCurrency = action.payload; 
      
    }, 
    changeQuoteCurrency: (state, action) => {
        state.quoteCurrency = action.payload;
    }, 
    changeBaseValue: (state, action) => {
        state.baseValue = action.payload; 
    }, 
    changeQuoteValue: (state, action) => {
        state.quoteValue = action.payload;
    }, 
    reverseCurrencies:  (state, action) => {
        var temp =  state.baseCurrency;
        state.baseCurrency = state.quoteCurrency;
        state.quoteCurrency = temp;

        state.baseValue = action.payload.quoteValue;
        state.quoteValue = action.payload.baseValue;

        state.conversionRate = (1/state.conversionRate).toFixed(5).toString();
       
    }, 
    changeTheme: (state, action) => {
        state.theme.color = action.payload.title;
        state.theme.hexCode = action.payload.colorHex; 
    }, 
    changeConversionRate: (state, action) => {
        state.conversionRate = action.payload;
    },
    getAllCurrencies: (state, action) => {
        state.allCurrencies = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { changeBaseCurrency, changeQuoteCurrency, reverseCurrencies, changeTheme, getAllCurrencies, changeConversionRate, changeBaseValue,changeQuoteValue } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic.

//  getAllCurrenciesFromAPI is the "thunk action creator"
export function getAllCurrenciesFromAPI() {
  // getAllCurrenciesFromAPIThunk is the "thunk function"
  return async function getAllCurrenciesFromAPIThunk(dispatch) {
   
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${RATES_API_KEY}/codes`);
    const json = await response.json();

    dispatch(getAllCurrencies(json.supported_codes.map( curr => curr[0]))); 

    };
}

export function getConversionRateForBaseCurrency(baseCurrency,quoteCurrency, changeInCurrency, baseValue, quoteValue) {
    
    // getAllCurrenciesFromAPIThunk is the "thunk function"
    return async function getConversionRateForBaseCurrency(dispatch) {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${RATES_API_KEY}/latest/${baseCurrency}`);
      const json = await response.json();
      const conversionRates = json.conversion_rates;   
      dispatch(changeConversionRate(conversionRates[quoteCurrency])); 
      if(changeInCurrency === "base"){
            if(!quoteValue){
                quoteValue = "0"; 
            }
            let calculate_base_value = (quoteValue/conversionRates[quoteCurrency]).toFixed(5);
            dispatch(changeBaseValue(calculate_base_value.toString()));
      }else{
            if(!baseValue){
                baseValue = "0"; 
            }
            let calculate_quote_value = (parseInt(baseValue)*conversionRates[quoteCurrency]).toFixed(5);
            dispatch(changeQuoteValue(calculate_quote_value.toString()));
      }
    };
}


  
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBaseCurrency = state => state.counter.baseCurrency;
export const selectQuoteCurrency = state => state.counter.quoteCurrency;
export const selectBaseValue = state => state.counter.baseValue;
export const selectQuoteValue = state => state.counter.quoteValue;
export const selectConversionRate = state => state.counter.conversionRate;
export const selectTheme = state => state.counter.theme;
export const selectAllCurrencies = state => state.counter.allCurrencies;


export default counterSlice.reducer;