import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchWithCache } from '../utils/api';

const CryptoChart = ({ coinId, coinName, onLoad, isImmediate = false }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!coinId) return;

      try {
        setLoading(true);
        setError(null);
        
        setEstimatedTime(5);
        const countdown = setInterval(() => {
          setEstimatedTime(prev => Math.max(0, prev - 1));
        }, 1000);

        const data = await fetchWithCache(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`,
          isImmediate
        );

        clearInterval(countdown);
        setEstimatedTime(0);

        console.log('Raw API data:', data); // Debug log
        
        // Проверяем структуру данных и корректно форматируем
        if (data && data.prices && Array.isArray(data.prices)) {
          const formattedData = data.prices.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString('ru-RU'),
            price: Number(price),
            fullDate: new Date(timestamp).toLocaleString('ru-RU')
          }));
          
          console.log('Formatted chart data:', formattedData); // Debug log
          setChartData(formattedData);
        } else {
          throw new Error('Invalid data format from API');
        }
        
        onLoad?.();
      } catch (error) {
        console.warn('Chart loading failed:', error);
        // ... остальной код обработки ошибок ...
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, onLoad, isImmediate, retryCount]);

  // Добавляем debug информацию
  console.log('Chart rendering with data:', {
    coinId,
    coinName,
    dataLength: chartData.length,
    loading,
    error
  });

  if (loading) {
    return (
      <div style={{ 
        color: 'white', 
        textAlign: 'center', 
        padding: '20px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        marginTop: '10px'
      }}>
        <div>⏳ Загрузка графика...</div>
        {estimatedTime > 0 && (
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
            Примерное время: {estimatedTime}сек
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        color: '#f87171', 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '14px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        marginTop: '10px'
      }}>
        ⚠️ {error}
        {estimatedTime > 0 && (
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.8 }}>
            Автоповтор через: {estimatedTime}сек
          </div>
        )}
      </div>
    );
  }

  // Проверяем есть ли данные для графика
  if (chartData.length === 0) {
    return (
      <div style={{ 
        color: '#fbbf24', 
        textAlign: 'center', 
        padding: '20px', 
        fontSize: '14px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        marginTop: '10px'
      }}>
        📊 Нет данных для графика
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '15px', borderRadius: '12px', marginTop: '10px' }}>
      <h4 style={{ color: 'white', margin: '0 0 15px 0', textAlign: 'center', fontSize: '14px' }}>
        {coinName} (7 дней)
      </h4>
      
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={10}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={10}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip 
            formatter={(value) => [`$${Number(value).toFixed(4)}`, 'Цена']}
            labelFormatter={(value) => `Дата: ${value}`}
            contentStyle={{ 
              background: 'rgba(0,0,0,0.9)', 
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#ff7300' }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Debug информация (можно удалить после фикса) */}
      <div style={{ 
        fontSize: '10px', 
        color: 'rgba(255,255,255,0.5)', 
        marginTop: '10px',
        textAlign: 'center'
      }}>
        Данных: {chartData.length} точек
      </div>
    </div>
  );
};

export default CryptoChart;