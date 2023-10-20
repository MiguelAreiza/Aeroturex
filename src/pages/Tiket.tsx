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
    const [id, setId] = useState<string>();
    const [name, setName] = useState<string>();
    const [document, setDocument] = useState<number>();
    const [price, setPrice] = useState<string | number>();
    const [method, setMethod] = useState<string>();
    const [voucher, setVoucher] = useState<string>();
    const [origin, setOrigin] = useState<string>();
    const [seller, setSeller] = useState<string>();
    const [collect, setCollect] = useState<string>();
    const [phone, setPhone] = useState<number>();
    const [scheduler, setScheduler] = useState<string>();

    const getTiket = () => {
        const urlParams = params.body?.split(';');

        urlParams?.forEach((param) => {
            const [rawKey, rawValue] = param.split(':');

            const key = rawKey.trim();
            const value = rawValue.trim();

            switch (key.toUpperCase()) {
                case 'ID':
                    setId(value);
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
                case 'METHOD':
                    setMethod(value);
                    break;
                case 'VOUCHER':
                    setVoucher(value);
                    break;
                case 'ORIGIN':
                    setOrigin(value);
                    break;
                case 'SELLER':
                    setSeller(value);
                    break;
                case 'COLLECT':
                    setCollect(value);
                    break;
                case 'PHONE':
                    setPhone(Number(value));
                    break;
                case 'SCHEDULER':
                    setScheduler(value);
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
            <Input type='text' value={id} setValue={setId} name='Id' disabled />
            <Input type='text' value={name} setValue={setName} name='Nombre' />
            <Input type='number' value={document} setValue={setDocument} name='Documento' disabled />
            <Input type='money' value={price} setValue={setPrice} name='Precio' disabled />
            <Input type='text' value={method} setValue={setMethod} name='Metodo de pago' disabled />
            <Input type='text' value={voucher} setValue={setVoucher} name='Comprobante' disabled />
            <Input type='text' value={origin} setValue={setOrigin} name='Origen' disabled />
            <Input type='text' value={seller} setValue={setSeller} name='Quien vendio' disabled />
            <Input type='text' value={collect} setValue={setCollect} name='Recogida' disabled />
            <Input type='number' value={phone} setValue={setPhone} name='Teléfono' disabled />
            <Input type='text' value={scheduler} setValue={setScheduler} name='Quien agendo' disabled />

            <Button name='Escanear' type='button' icon='send' onClick={() => navigate('/')} />                
        </form>
    );
}

export { Tiket };