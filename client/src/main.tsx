import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter} from 'react-router-dom'
import AuthCon from "./auth";

interface IAuthContext {
    auth: AuthCon
}
const auth = new AuthCon();
export const AuthContext = createContext<IAuthContext>({
    auth
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthContext.Provider value={{auth}}>
              <App />
          </AuthContext.Provider>
      </BrowserRouter>
  </React.StrictMode>,
)
