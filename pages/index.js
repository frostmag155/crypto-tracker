// pages/index.js
import AnimatedHeader from '../components/AnimatedHeader';
import CryptoList from '../components/CryptoList';
import { motion } from 'framer-motion'; // Добавляем импорт

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <AnimatedHeader />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            padding: '30px', 
            marginTop: '20px',
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ fontSize: '28px', fontWeight: '600', marginBottom: '20px', color: 'white', textAlign: 'center' }}
          >
            📊 Актуальные курсы криптовалют
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center', fontSize: '16px', marginBottom: '30px' }}
          >
            Данные обновляются каждую минуту
          </motion.p>
          
          <CryptoList />
        </motion.div>
      </main>
    </div>
  );
}