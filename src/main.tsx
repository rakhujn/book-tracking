import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './assets/styles/style.scss'


import { Dropdown } from 'bootstrap'
import { Rating } from './Rating'


const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
export const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new Dropdown(dropdownToggleEl))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rating total={10} rating={5.5} />
    {/* <App /> */}
  </React.StrictMode>
)
