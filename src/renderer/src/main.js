import { mount } from 'svelte'

import './assets/global.css'
import './assets/alert.svg'
import './assets/delete.svg'
import './assets/eye.svg'
import './assets/eye-slash.svg'

import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')
})

export default app
