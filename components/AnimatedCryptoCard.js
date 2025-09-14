import { motion } from 'framer-motion';

export default function AnimatedCryptoCard({ crypto, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, // Уменьшаем длительность
        delay: index * 0.07, // Уменьшаем задержку между карточками
        type: "spring",
        stiffness: 120 // Увеличиваем жесткость для более быстрой анимации
      }}
      whileHover={{ 
        scale: 1.03, // Уменьшаем масштаб для более быстрой реакции
        rotateZ: 0.5, // Уменьшаем вращение
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 } // Быстрая анимация при наведении
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
    >
      {/* Упрощаем анимацию фона */}
      <div
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
          transition: 'background 0.3s ease' // CSS transition вместо motion
        }}
      />
      
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
    </motion.div>
  );
}