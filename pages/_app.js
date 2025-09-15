import { ChartProvider } from '../context/ChartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChartProvider>
      <Component {...pageProps} />
    </ChartProvider>
  );
}

export default MyApp;