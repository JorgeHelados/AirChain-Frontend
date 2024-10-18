import React, { useEffect, useState } from 'react';

function App() {
    const [ultimoValor, setUltimoValor] = useState('');

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:4000/api/medicion') // Enlace de localhost con la conexión
                .then(response => response.json())
                .then(data => setUltimoValor(data.cantidad))
                .catch(error => console.error('Error fetching data:', error));
        };

        fetchData();
        const interval = setInterval(fetchData, 1000); // Fetch data every second

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '4rem' }}>
                Último valor: {ultimoValor}
            </h1>
        </div>
    );
}

export default App;