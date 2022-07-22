import '../css/main.scss'
import Toast from './toast'
import * as Turbo from '@hotwired/turbo'

Turbo.clearCache()

customElements.define('app-toast', Toast)
