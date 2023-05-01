
import{configureStore} from'@reduxjs/toolkit'
import userLoginSlice from './slices/userLogin.slice'

const store = configureStore({
    reducer: userLoginSlice
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export{store}