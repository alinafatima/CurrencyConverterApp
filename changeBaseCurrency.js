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
    }
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
        console.log(action);
    }
  }
})

// Action creators are generated for each case reducer function
export const { changeBaseCurrency, changeQuoteCurrency, reverseCurrencies, changeBaseValue, changeQuoteValue, changeTheme } = counterSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
//export const incrementAsync = amount => dispatch => {
 //   setTimeout(() => {
  //    dispatch(incrementByAmount(amount));
   // }, 1000);
  //};
  
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  // in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBaseCurrency = state => state.counter.baseCurrency;
export const selectQuoteCurrency = state => state.counter.quoteCurrency;
export const selectBaseValue = state => state.counter.baseValue;
export const selectQuoteValue = state => state.counter.quoteValue;
export const selectConversionRate = state => state.counter.conversionRate;
export const selectTheme = state => state.counter.theme;


export default counterSlice.reducer