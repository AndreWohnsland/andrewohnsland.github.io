import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import { ThemeContext } from './contexts/ThemeContext';
import SwitchComponent from './components/SwitchComponent';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const App: React.FC = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const theme = isLightTheme ? 'light' : 'dark';
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="App h-100">
            <NavBar />
            <main className={`content-container container-${theme} h-100`}>
              <SwitchComponent />
            </main>
            <Footer />
          </div>
          {process.env.REACT_APP_DEV === 'true' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
