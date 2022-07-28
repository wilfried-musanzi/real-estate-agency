import '../css/main.scss'
import Toast from './toast'
import Swup from 'swup'
import SwupSlideTheme from '@swup/slide-theme'
import SwupProgressPlugin from '@swup/progress-plugin'

new Swup({
  plugins: [new SwupSlideTheme(), new SwupProgressPlugin()],
})

customElements.define('app-toast', Toast)
