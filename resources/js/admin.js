import '../css/dashlite.min.css'
import Toast from './toast'
import './utils/scripts'
import * as Turbo from '@hotwired/turbo'

Turbo.start()
customElements.define('app-toast', Toast)
