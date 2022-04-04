import barba from '@barba/core'
import gsap from 'gsap'

let pageX = 0
let pageY = 0
document.addEventListener('click', (event) => {
  if (event.target.hasAttribute('href')) {
    pageX = event.pageX
    pageY = event.pageY
  }
})

barba.init({
  transitions: [
    {
      name: 'opacity',
      enter(data) {
        return gsap.to('#transition', {
          scale: 0,
          ease: 'expo.inOut',
          duration: 1,
          display: 'none'
        })
      },
      leave(data) {
        const tl = gsap.timeline()

        return tl.fromTo('#transition', {
          display: 'block',
          scale: 0,
          top: pageY,
          left: pageX
        },
        {
          scale: 1,
          ease: 'expo.inOut',
          duration: 1,
        })
        .to(data.current.container, {
          display: 'none'
        })
      }
    }
  ],

  views: [
    {
      namespace: 'home',
      beforeLeave(data) {
        console.log(data)
      }
    }
  ]
})



const menu = document.getElementById("open-menu")

menu.addEventListener("click", () => {
  if (menu.classList.contains("closed")) {
    menu.innerHTML = "CLOSE MENU"
    menu.classList.remove("closed")
    return
  } else {
    menu.innerHTML = "OPEN MENU"
    menu.classList.add("closed")
  }
})

const closeButton = document.getElementById("sidebar-close")
closeButton.addEventListener("click", () => {
  menu.innerHTML = "OPEN MENU"
  menu.classList.add("closed")
})
