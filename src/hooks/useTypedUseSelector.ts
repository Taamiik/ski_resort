import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducers';

export const useTypedUseSelector: TypedUseSelectorHook<RootState> = useSelector;