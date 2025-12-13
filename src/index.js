
import React , {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//theme
import "primeflex/primeflex.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import CatalogStore from "./store/catalogStore";
import ProductStore from "./store/productStore";
import ProductsDataCalcStore from "./store/productsDataCalcStore";
import ServerUpdateStore from "./store/serverUpdateStore";
import ProductListStore from "./store/productListStore";
import StartProductsStore from "./store/startProductsStore";

// Создаем контекст - классы сданными с которыми работаем внутри сессии
const catalogStore = new CatalogStore()
const serverUpdateStore = new ServerUpdateStore()
const productStore = new ProductStore()

const productsDataCalcStore = new ProductsDataCalcStore()
const productListStore = new ProductListStore()
const startProductsStore = new StartProductsStore()
export const Context = createContext({
    catalogStore, productStore, productsDataCalcStore, serverUpdateStore, productListStore,startProductsStore
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);



