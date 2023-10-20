/// <reference types="react-scripts" />

declare module 'uuid';
declare module 'react-qr-scanner';
declare module '*.wav';

interface SelectOption {
	value: string;
	label: string;
	complete: object;
}

interface SelectGroupOption{
	label: string;
	options: Array<SelectOption>;
}