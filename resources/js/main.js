import '../css/main.scss'
import Toast from './toast'
import Swup from 'swup'
import SwupSlideTheme from '@swup/slide-theme'

new Swup({
  plugins: [new SwupSlideTheme()],
})
customElements.define('app-toast', Toast)
