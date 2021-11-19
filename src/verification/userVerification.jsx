import {
    CheckCircleTwoTone, WarningTwoTone
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { verifyUser } from '../services/usersService';

export default function UserVerification() {
    const [status, setStatus] = useState('loading');
    const { code } = useParams();

    useEffect(() => {
        if (code)
            verifyUser({ hashCode: code }).then(result => setStatus(result.status));
        else
            setStatus('failed');
    }, [])

    switch (status) {
        case 'verified':
            return (
                <div className='verification-message success'>
                    <h2>Su cuenta ha sido activada</h2>
                    <p>Puede cerrar esta ventana e iniciar sesión en DOCPS</p>
                    <CheckCircleTwoTone twoToneColor="#006cc9" style={{ fontSize: "200%" }} />
                </div>
            );
        case 'expired':
            return (
                <div className='verification-message expired'>
                    <h2>El link proporcionado expiró</h2>
                    <p>Póngase en contacto con soporte para más información</p>
                    <WarningTwoTone style={{ fontSize: "200%" }} />
                </div>
            );
        case 'loading':
            return <>Verificando...</>;
        default:
            return (
                <div className='verification-message fail'>
                    <h2>Algo salió mal</h2>
                    <p>Póngase en contacto con soporte para más información</p>
                    <WarningTwoTone twoToneColor="#ff4d4f" style={{ fontSize: "200%" }} />
                </div>
            );

    }
}