import {createRoot} from 'react-dom/client'
import './App.css'
import './Components/Contato.css'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App'
createRoot(document.querySelector('#root')).render(<App />)