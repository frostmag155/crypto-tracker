// components/CryptoList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import AnimatedCryptoCard from './AnimatedCryptoCard';

export default function CryptoList() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/crypto');
        setCryptoData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Не удалось загрузить данные');
        console.error('Ошибка при загрузке данных:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '40px', marginBottom: '20px' }}
        >
          ⏳
        </motion.div>
        <p>Загрузка данных о криптовалютах...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
        <p>❌ {error}</p>
        <motion.button 
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Попробовать снова
        </motion.button>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '20px', 
      marginTop: '30px' 
    }}>
      {cryptoData.map((crypto, index) => (
        <AnimatedCryptoCard key={crypto.id} crypto={crypto} index={index} />
      ))}
    </div>
  );
}