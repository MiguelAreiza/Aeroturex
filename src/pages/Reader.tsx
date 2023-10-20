import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import { TfiReload } from 'react-icons/tfi';

// Components
import { useAppStates } from '../helpers/states';
// Sources
import '../styles/Reader.css'
import AudioQR from '../assets/sounds/barcode.wav';

function Reader() {
    const { setIsLoading, addToastr } = useAppStates();
    const navigate = useNavigate();    
    const [cameraId, setCameraId] = useState('');
    const [loadingDevices, setLoadingDevices] = useState(true);
    const [prevScan, setPrevScan] = useState('');

    useEffect(() => {
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#2D4E7F');
        document.querySelector('meta[name="background-color"]')?.setAttribute('content', '#2D4E7F');
        handleCamera();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCamera = async () => {
        try {
            setLoadingDevices(true);
            if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter((device) => device.kind === 'videoinput');
                
                if (videoDevices.length > 1) {
                    setCameraId(videoDevices[1].deviceId);
                } else {
                    setCameraId(videoDevices[0].deviceId);
                }
                setTimeout(() => {
                    setLoadingDevices(false);
                }, 500);
            } else {
                addToastr('Tu dispositivo no cuenta con dispositivos de video', 'info');
            }
        } catch (error: any) {
            if (error.name === 'NotAllowedError') {
                addToastr('Permiso denegado para acceder a la cámara', 'info');
            } else if (error.name === 'NotFoundError') {
                addToastr('No se encontraron dispositivos de cámara', 'info');
            } else {
                addToastr('Error al obtener permiso para los dispositivos de video', 'info');
            }
        } finally {            
            setTimeout(() => {
                setIsLoading(false);
            }, 1000); 
        }
    };

    const handleScan = (data: any) => {
        if (data) {
            if (data.text !== prevScan) {
                const audio = new Audio(AudioQR);
                audio.play();                
                setPrevScan(data.text);
                if (!data.text.includes('https://aeroturex.maddiapp.com/tiket/id:') || !data.text.split('/')[4]) {
                    addToastr('Cliente no valido', 'info');
                } else {
                    navigate(`/tiket/${data.text.split('/')[4]}`);
                }
            }
        }
    };

    const handleError = (err: any) => {
        addToastr(err, 'error');
    };

    return (
        <div className='container_qr_reader'>
            <h3>QR Code Reader</h3>

            <div className='qrReader'>
                <TfiReload className={loadingDevices ? 'reload active' : 'reload'} size={40} onClick={handleCamera}/>
                
                { !loadingDevices &&
                    <div>
                        <QrReader
                        delay={500}
                        onError={handleError}
                        onScan={handleScan}
                        constraints={{ audio: false, video: { deviceId: cameraId }}}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

export { Reader };