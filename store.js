
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './changeBaseCurrency'


export default configureStore({
  reducer: {
    counter: counterReducer
  }
})


