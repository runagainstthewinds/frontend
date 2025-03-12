import React, { useEffect, useState } from 'react';
import { fetchQRCode } from '../api/QRCodeApi';

const QRCodeDisplay: React.FC = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

    useEffect(() => {
        fetchQRCode()
            .then((url) => setQrCodeUrl(url))
            .catch((error) => console.error('Error loading QR code:', error));
    }, []);

    return (
        <div>
            {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
        </div>
    );
};

export default QRCodeDisplay;