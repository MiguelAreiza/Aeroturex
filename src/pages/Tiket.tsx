import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import { useAppStates } from '../helpers/states';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

function Tiket() {
    const { setIsLoading, addToastr } = useAppStates();
    const params = useParams();
    const navigate = useNavigate();
    const [tour, setTour] = useState<string>();
    const [date, setDate] = useState<string>();
    const [position, setPosition] = useState<string>();
    const [name, setName] = useState<string>();
    const [document, setDocument] = useState<number>();
    const [price, setPrice] = useState<string | number>();
    const [paymentMethod, setPaymentMethod] = useState<string>();
    const [remark, setRemark] = useState<string>();
    const [origin, setOrigin] = useState<string>();

    const getTiket = () => {
        const urlParams = params.body?.split(';');
        console.log(params.body);        
        console.log(urlParams);

        urlParams?.forEach((param) => {
            const [rawKey, rawValue] = param.split(':');

            const key = rawKey.trim();
            const value = rawValue.trim();

            switch (key.toUpperCase()) {
                case 'TOUR':
                    setTour(value);
                    break;
                case 'DATE':
                    setDate(value);
                    break;
                case 'POSITION':
                    setPosition(value);
                    break;
                case 'NAME':
                    setName(value);
                    break;
                case 'DOCUMENT':
                    setDocument(Number(value));
                    break;
                case 'PRICE':
                    setPrice(value);
                    break;
                case 'PAYMENTMETHOD':
                    setPaymentMethod(value);
                    break;
                case 'REMARK':
                    setRemark(value);
                    break;
                case 'ORIGIN':
                    setOrigin(value);
                    break;          
                default:
                    break;
            }
        });
        
        addToastr(`Escaneo exitoso`);
        setIsLoading(false);
    }

    useEffect(() => {
        getTiket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className='form_inputs'>
            <h1 className='form_title'>{tour}</h1>
            <h2 className='form_subtitle'>{date}</h2>
            
            <Input type='text' value={position} setValue={setPosition} name='Puesto' disabled />
            <Input type='text' value={name} setValue={setName} name='Nombre' />
            <Input type='number' value={document} setValue={setDocument} name='Documento' disabled />
            <Input type='money' value={price} setValue={setPrice} name='Precio' disabled />
            <Input type='text' value={paymentMethod} setValue={setPaymentMethod} name='Metodo de pago' disabled />
            <Input type='text' value={origin} setValue={setOrigin} name='Origen' disabled />
            <Input type='textarea' value={remark} setValue={setRemark} name='Comentarios' disabled />

            <Button name='Escanear' type='button' icon='send' onClick={() => navigate('/')} />                
        </form>
    );
}

export { Tiket };