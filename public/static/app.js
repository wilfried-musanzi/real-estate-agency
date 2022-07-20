const sections = document.querySelectorAll('.section')

const revealElement = function (entries, _) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('hidden')
}

const sectionObserver = new IntersectionObserver(revealElement, {
  root: null,
  threshold: 0.15,
})

sections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('hidden')
})

const nav = document.querySelector('.contact')
nav.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
  const href = e.target.getAttribute('href')
  if (href) document.querySelector(href).scrollIntoView({ behavior: 'smooth' })
})
