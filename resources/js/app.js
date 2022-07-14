import '../css/main.scss'
import '../css/tailwind.css'
import './tail.js'
import '@hotwired/turbo'

import Toast from './toast'

customElements.define('app-toast', Toast)
