import '../css/main.scss'
import Toast from './toast'
import Swup from 'swup'
import SwupSlideTheme from '@swup/slide-theme'
// import '@hotwired/turbo'

new Swup({
  plugins: [new SwupSlideTheme()],
})
customElements.define('app-toast', Toast)
