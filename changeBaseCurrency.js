import { createSlice } from '@reduxjs/toolkit'

export const counterSlice= createSlice({
  name: 'counter',
  initialState: {
    baseCurrency: "USD", 
    quoteCurrency: "GBP",
    baseValue: "0",
    quoteValue: "0", 
    conversionRate: "0.77208", 
    theme: {
        color: 'gray',
        hexCode: '#516d79'
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
    reverseCurrencies:  state => {
        var temp =  state.baseCurrency;
        state.baseCurrency = state.quoteCurrency;
        state.quoteCurrency = temp;
       
    }, 
    changeBaseValue: (state, action) => {
        state.baseValue = action.payload; 
    }, 
    changeQuoteValue: (state, action) => {
        state.quoteValue = action.payload;
    }, 
    changeTheme: (state, action) => {
        state.theme.color = action.payload.title;
        state.theme.hexCode = action.payload.colorHex; 
        //console.log(action);
    }, 
    getAllCurrencies: (state, action) => {
        state.allCurrencies = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeBaseCurrency, changeQuoteCurrency, reverseCurrencies, changeBaseValue, changeQuoteValue, changeTheme, getAllCurrencies } = counterSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*
export const getAllCurrenciesFromAPI = amount => dispatch => {
    
  
};
*/
//  getAllCurrenciesFromAPI is the "thunk action creator"
export function getAllCurrenciesFromAPI() {
  // getAllCurrenciesFromAPIThunk is the "thunk function"
  return async function getAllCurrenciesFromAPIThunk(dispatch) {
    const response = await fetch('http://api.exchangeratesapi.io/v1/symbols?access_key=6cb91471afd36f3afa36b4ab3a8c18df');
    //console.log(response);
    const json = await response.json();
 
    
       
    const allcurrencies = Object.keys(json.symbols);
    dispatch(getAllCurrencies(allcurrencies)); 
  }
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


export default counterSlice.reducer