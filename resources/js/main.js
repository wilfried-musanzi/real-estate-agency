import '../css/main.scss'
import '@hotwired/turbo'
// import 'htmx.org'

import Toast from './toast'

customElements.define('app-toast', Toast)

// const hide = document.querySelectorAll('.hide')

// window.addEventListener('load', () => {
//   hide.forEach((el) => {
//     el.classList.remove('hide')
//   })
// })

// const sections = document.querySelectorAll('.section')

// const revealElement = function (entries, _) {
//   const [entry] = entries
//   if (!entry.isIntersecting) return
//   entry.target.classList.remove('hidden')
// }

// const elementObserver = new IntersectionObserver(revealElement, {
//   root: null,
//   threshold: 0.15,
// })

// sections.forEach(function (elemetn) {
//   elementObserver.observe(elemetn)
//   elemetn.classList.add('hidden')
// })

// const mainNav = document.querySelector('.header')
// const mainNavHeight = mainNav.getBoundingClientRect().height
// const observer = new IntersectionObserver(
//   (entries) => {
//     const [entry] = entries
//     if (!entry.isIntersecting) mainNav.classList.add('sticky')
//     else mainNav.classList.remove('sticky')
//   },
//   {
//     root: null,
//     threshold: 0,
//     rootMargin: `-${mainNavHeight}px`,
//   }
// )

// observer.observe(document.querySelector('.hero'))
// const nav = document.querySelector('.contact')
// nav.addEventListener('click', (e) => {
//   e.preventDefault()
//   console.log(e.target)
//   const href = e.target.getAttribute('href')
//   if (href) document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
// })
