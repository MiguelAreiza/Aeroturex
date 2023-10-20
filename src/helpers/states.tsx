import { createContext, useContext, useState } from 'react';

// Components
import { PageContent } from '../components/PageContent';
import { Spinner } from '../components/Spinner';
// Styles 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Toastify.css';
// Sources
import { ToastContainer, toast } from 'react-toastify';
import { v4 as newId } from 'uuid';
import iconSuccess from '../assets/images/toastr/Success.svg';
import iconInfo from '../assets/images/toastr/Info.svg';
import iconWarning from '../assets/images/toastr/Warning.svg';
import iconError from '../assets/images/toastr/Error.svg';

type StatesContextType = {
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
	addToastr: (message: string, type?: 'success' | 'info' | 'warning' | 'error', time?: number) => void
	newId: () => string
};

const statesContext = createContext<StatesContextType | undefined>(undefined);

interface StatesProviderProps {
    children: React.ReactNode
};

function StatesProvider({ children }: StatesProviderProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	
	const iconGroup = {
		success: iconSuccess,
		info: iconInfo,
		warning: iconWarning,
		error: iconError,
	};

    const addToastr = (message: string, type?: 'success' | 'info' | 'warning' | 'error', time?: number) => {
		const icon = iconGroup[type || 'success'];
		
		toast(message, {
			toastId: message,
			type: type || 'success',
			autoClose: time || 5000,
			icon: () => <img src={icon} alt={`${type} Icon`} width='27px' height='27px' />,
		});
    }

	const states: StatesContextType = { setIsLoading, addToastr, newId };

	return (
		<statesContext.Provider value={states}>
			<PageContent>
				{children}
			</PageContent>

			{ isLoading ? <Spinner /> : null}

			<ToastContainer
				position='top-center'
			/>
		</statesContext.Provider>		
	);
}

function useAppStates(): StatesContextType {
	const appStates = useContext(statesContext);
	if (!appStates) {
        throw new Error('The appStates must be used within a correct approach');
    }
	return appStates;
}

export {
	StatesProvider,
	useAppStates
};