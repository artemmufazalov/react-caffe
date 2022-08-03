// Libs
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { RootState } from '../../store';

interface IAppState {
	backendUrl: string;
}

const initialState: IAppState = {
	backendUrl: '',
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setServerUrl: (state, action: PayloadAction<string>) => {
			state.backendUrl = action.payload;
		},
	},
});

export const { setServerUrl } = appSlice.actions;

export const selectBackendUrl = (state: RootState) => state.app.backendUrl;

export default appSlice.reducer;
