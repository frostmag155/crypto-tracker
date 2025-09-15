import { createContext, useContext, useState } from 'react';

const ChartContext = createContext();

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartProvider');
  }
  return context;
};

export const ChartProvider = ({ children }) => {
  const [openChartId, setOpenChartId] = useState(null);

  const openChart = (id) => {
    setOpenChartId(id);
  };

  const closeChart = () => {
    setOpenChartId(null);
  };

  const toggleChart = (id) => {
    if (openChartId === id) {
      closeChart();
    } else {
      openChart(id);
    }
  };

  return (
    <ChartContext.Provider value={{ openChartId, openChart, closeChart, toggleChart }}>
      {children}
    </ChartContext.Provider>
  );
};