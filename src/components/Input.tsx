import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';

// Components
import { useAppStates } from '../helpers/states';
import { valueToCurrency } from '../helpers/functions';
// Styles
import '../styles/Input.css';

interface TypeSelectProps {
	id: string;
	value: SelectOption | null;
	setValue: React.Dispatch<React.SetStateAction<SelectOption | null>>;
	name: string;
	required: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	options: Array<SelectOption>;
	defaultValue?: string
	isSearchable?: boolean
	isMultiSelect?: boolean
}

function TypeSelect({id, value, setValue, name, required, disabled, onChange, options, defaultValue, isSearchable, isMultiSelect}: TypeSelectProps) {
	const [newValue, setNewValue] = useState<SelectOption | null>(null);
	
	const styles = {
		control: (provided: any) => ({
			...provided,
			width: '100%',
			height: '56px',
			background: 'var(--inputs)',
			color: 'var(--dark)',
			border: 'none',
			boxShadow: 'none',
			outline: 'none',
			borderRadius: '2vh',
			textAlign: 'center',
			fontSize: '1rem',
			padding: '0 2vh',
			display: 'flex',
		}),
	};	

	useEffect(() => {
		if (defaultValue && typeof(value) === 'string') {
			setTimeout(() => {
				const filterValue = options.filter((opt: SelectOption) => opt.value === defaultValue)[0];
				setNewValue(filterValue);
				setValue(filterValue);				
			}, 100);
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue]);

	const handleChange = useCallback((e: any)=>{
		setValue(e);

        if (onChange) onChange(e);
	}, [setValue, onChange]);

	return(
		<div className='input_field' >
			<label className='field_name' htmlFor={id} >{name}</label>
			<Select
				styles={styles}
				inputId={id}
				name={name.replaceAll(' ', '-')}
				value={value}
				defaultValue={newValue}
				options={options}
				onChange={handleChange}
				isSearchable={isSearchable}
				isDisabled={disabled}
				isMulti={isMultiSelect}
				isClearable
				required={required}
				placeholder={name}
				noOptionsMessage={() => `Sin resultados de ${name}`}
				closeMenuOnSelect={isMultiSelect ? false : true}
				tabSelectsValue
			/>
		</div>
	)
}

interface TypeTextAreaProps {
	id: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	name: string;
	required: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TypeTextArea({id, value, setValue, name, required, disabled, onChange}: TypeTextAreaProps) {

	const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e)=>{		
		setValue(e.currentTarget.value);

        if (onChange) onChange(e);
	}, [setValue, onChange]);

	return(		
		<div className='input_field'>
			<label className='field_name' htmlFor={id} >{name}</label>
			<textarea
				className='field_type_textarea'
				id={id}
				name={name.replaceAll(' ', '-')}
				onChange={handleChange}
				value={value}
				placeholder={name}
				required={required}
				disabled={disabled}
			></textarea>
		</div>
	)
}

interface TypeBasicProps {
	id: string;
	value: string | number | boolean;
	setValue: React.Dispatch<React.SetStateAction<string | number | boolean>>;
	name: string;
	required: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoComplete?: string;
	min?: number;
	max?: number;
	type: string
}

function TypeBasic({id, value, setValue, name, required, disabled, onChange, autoComplete, min, max, type}: TypeBasicProps) {
	const [subType, setSubType] = useState<string>(type);

	useEffect( () => {
		if (type === 'money' && (typeof(value) === 'string' || typeof(value) === 'number')) {
			setValue(valueToCurrency(value));
			setSubType('text')
		}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e)=>{
		if (type === 'money' && (typeof(value) === 'string' || typeof(value) === 'number')) {	
			setValue(valueToCurrency(e.currentTarget.value));
		} else if (type === 'checkbox') {
			setValue(e.currentTarget.checked)
		} else {
			setValue(e.currentTarget.value);
		}

        if (onChange) onChange(e);
	}, [type, value, setValue, onChange]);

	return(		
		<div className='input_field'>
			<label className='field_name' htmlFor={id} >{name}</label>
			<div className={subType === 'checkbox'?'field_type_slider':''}>
				<input
					className={subType !== 'checkbox'?'field_type_input':''}
					id={id}
					name={name.replaceAll(' ','-')}
					type={type}
					onChange={handleChange}
					value={subType !== 'checkbox' && typeof(value) !== 'boolean' ? value : undefined}
					checked={subType === 'checkbox' && typeof(value) === 'boolean' ? value : undefined}                
					placeholder={name}
					required={subType === 'checkbox'? false : required}
					disabled={disabled}
					autoComplete={autoComplete}
					min={min}
					max={max}
				/>
				{subType === 'checkbox' && <label htmlFor={id}></label>}
			</div>
		</div>
	)
}

interface InputProps {
	type: 'text' | 'number' |'checkbox' | 'date' | 'time' | 'email' | 'tel' | 'password' | 'money' | 'select' | 'textarea';
	value: any;
	setValue: React.Dispatch<React.SetStateAction<any>>;
	name: string;
	required?: boolean;
	disabled?: boolean;
	onChange?: (e: React.ChangeEvent) => void;
	autoComplete?: string;
	min?: number;
	max?: number;
	options?: Array<SelectOption>;
	isMultiSelect?: boolean;
	defaultValue?: string;
	isSearchable?: boolean;
}

function Input({ type, name, value, setValue, onChange, required = true, disabled, autoComplete = 'off', min, max, options, isMultiSelect, defaultValue, isSearchable = true }: InputProps) {
	const { newId } = useAppStates();
	const basicTypes = ['text', 'number','checkbox', 'date', 'time', 'email', 'tel', 'password', 'money'];
	
    return (
		<>{
			type === 'select' && options ?
				<TypeSelect id={newId()} value={value} setValue={setValue} name={name} required={required} disabled={disabled} onChange={onChange} options={options} defaultValue={defaultValue} isSearchable={isSearchable} isMultiSelect={isMultiSelect} />
			: type === 'textarea' ?
				<TypeTextArea id={newId()} value={value} setValue={setValue} name={name} required={required} disabled={disabled} onChange={onChange} />
			: basicTypes.includes(type) ?
				<TypeBasic id={newId()} value={value} setValue={setValue} name={name} required={required} disabled={disabled} onChange={onChange} autoComplete={autoComplete} min={min} max={max} type={type} />
			:
				null
		}</>
    );	
}

export { Input };