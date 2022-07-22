import '../css/dashlite.min.css'
import Toast from './toast'
import * as Turbo from '@hotwired/turbo'

Turbo.clearCache()
customElements.define('app-toast', Toast)
