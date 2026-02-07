import { Provider, useDispatch, useSelector } from "react-redux";
import store, {AppDispatch, RootState} from "./store";
import { ReactElement } from "react";

export default function ReduxProvider({ children }:
    {
        children: ReactElement
    }
){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();