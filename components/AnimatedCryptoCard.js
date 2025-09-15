import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import CryptoChart from './CryptoChart';
import { useChart } from '../context/ChartContext';

export default function AnimatedCryptoCard({ crypto, index }) {
  const { openChartId, toggleChart } = useChart();
  const [isChartLoaded, setIsChartLoaded] = useState(false);
  const isOpen = openChartId === crypto.id;

  useEffect(() => {
    if (!isOpen) {
      setIsChartLoaded(false);
    }
  }, [isOpen]);

  const handleCardClick = () => {
    toggleChart(crypto.id);
  };

  const handleChartLoad = () => {
    setIsChartLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.07,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ 
        scale: 1.03,
        rotateZ: 0.5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        padding: '20px', 
        textAlign: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        margin: '10px'
      }}
      onClick={handleCardClick}
      layout // Добавляем layout анимацию
    >
      {/* Анимированный фон */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, 
            ${crypto.price_change_percentage_24h >= 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'}, 
            rgba(255, 255, 255, 0.05)
          )`,
          zIndex: -1,
        }}
        animate={{
          background: isOpen 
            ? `linear-gradient(45deg, 
                ${crypto.price_change_percentage_24h >= 0 ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)'}, 
                rgba(255, 255, 255, 0.1)
              )`
            : `linear-gradient(45deg, 
                ${crypto.price_change_percentage_24h >= 0 ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'}, 
                rgba(255, 255, 255, 0.05)
              )`
        }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Контент карточки */}
      <motion.div 
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={crypto.image} 
          alt={crypto.name}
          style={{ 
            width: '40px', 
            height: '40px', 
            marginRight: '10px',
            borderRadius: '50%'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h3 style={{ color: 'white', margin: '0' }}>{crypto.symbol.toUpperCase()}</h3>
      </motion.div>
      
      <h4 style={{ color: 'white', margin: '10px 0', fontSize: '18px' }}>
        {crypto.name}
      </h4>
      
      <motion.p 
        style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '24px', fontWeight: 'bold', margin: '10px 0' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.07 + 0.2, duration: 0.3 }}
      >
        ${crypto.current_price.toLocaleString()}
      </motion.p>
      
      <motion.p 
        style={{ 
          color: crypto.price_change_percentage_24h >= 0 ? '#4ade80' : '#f87171',
          margin: '5px 0',
          fontWeight: '600'
        }}
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {crypto.price_change_percentage_24h >= 0 ? '↗ ' : '↘ '}
        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
      </motion.p>
      
      <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', margin: '5px 0' }}>
        Капитализация: ${crypto.market_cap.toLocaleString()}
      </p>

      {/* Анимация открытия графика */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              height: 'auto', 
              y: 0,
              transition: {
                opacity: { duration: 0.4, delay: 0.1 },
                height: { duration: 0.6, ease: "easeOut" },
                y: { duration: 0.5, ease: "backOut" }
              }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              y: -20,
              transition: {
                opacity: { duration: 0.3 },
                height: { duration: 0.4 },
                y: { duration: 0.3 }
              }
            }}
            style={{ 
              marginTop: '20px', 
              paddingTop: '15px', 
              borderTop: '1px solid rgba(255,255,255,0.2)',
              overflow: 'hidden'
            }}
            layout
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isChartLoaded ? 1 : 0.5,
                transition: { duration: 0.4, delay: 0.2 }
              }}
            >
              <CryptoChart 
                coinId={crypto.id} 
                coinName={crypto.name}
                onLoad={handleChartLoad}
                isImmediate={openChartId === null} // Первый график - высокий приоритет
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Индикатор загрузки */}
      <AnimatePresence>
        {isOpen && !isChartLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              color: 'rgba(255,255,255,0.7)', 
              textAlign: 'center', 
              padding: '20px', 
              fontSize: '14px' 
            }}
          >
            ⏳ Загрузка графика...
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}