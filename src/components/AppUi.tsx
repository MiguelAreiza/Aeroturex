import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import { StatesProvider } from '../helpers/states';

// Routes
import { Reader } from '../pages/Reader';
import { Tiket } from '../pages/Tiket';

import { Default } from '../pages/Default';

function AppUi() { 
    return (
        <BrowserRouter basename='/'>
			<StatesProvider>
				<Routes>
					<Route path='/' element={<Reader />} />
					<Route path='/tiket/:body' element={<Tiket />} />

					<Route path='*' element={<Default />} />
				</Routes>
			</StatesProvider>
        </BrowserRouter>
    )
};

export { AppUi };