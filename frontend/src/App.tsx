import ErrorBoundary from './Components/ErrorBoundry'
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeConfig from './theme';
import Router from './routers/index';
import '@fontsource/poppins';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store";

function App() {

  return (

   <ErrorBoundary>
    <ThemeConfig>
      <ReduxProvider store={store}> 
        <Router/>
    </ReduxProvider> 
     <ToastContainer />
    </ThemeConfig>
   </ErrorBoundary>

  )
}

export default App
