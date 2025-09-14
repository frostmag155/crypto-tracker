import { motion } from 'framer-motion';

export default function AnimatedHeader() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(10px)',
        color: 'white', 
        padding: '25px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💰 Crypto Tracker
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{ fontSize: '1.1rem', margin: '10px 0 0 0' }}
        >
          Отслеживание курсов криптовалют в реальном времени
        </motion.p>
      </div>
    </motion.header>
  );
}