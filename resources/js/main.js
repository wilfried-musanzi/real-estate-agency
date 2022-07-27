import '../css/main.scss'
import Toast from './toast'
import Swup from 'swup'
// import '@hotwired/turbo'

new Swup()
customElements.define('app-toast', Toast)
