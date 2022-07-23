import '../css/main.scss'
import Toast from './toast'
import * as Turbo from '@hotwired/turbo'
Turbo.session.cacheObserver = true

customElements.define('app-toast', Toast)
