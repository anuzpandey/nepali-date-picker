import './style.css'
import Alpine from 'alpinejs'
import $ from "jquery";

window.Alpine = Alpine

Alpine.start()

let headerWrapper = document.getElementById('header_wrapper')
let navPos = headerWrapper.offsetTop + 100

window.addEventListener('scroll', e => {
    let viewportHeight = window.innerHeight
    let scrollPos = window.scrollY
    if (scrollPos > navPos) {

        headerWrapper.classList.add('sticky', 'top-0', 'bg-slate-900/80', 'w-full', 'z-50', 'backdrop-blur-md', 'border-b', 'border-slate-800')
        headerWrapper.classList.remove('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-4', 'sm:py-6', 'lg:py-8')
        headerWrapper.children[0].classList.add('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    } else {

        headerWrapper.classList.remove('sticky', 'top-0', 'bg-slate-900/80', 'w-full', 'z-50', 'backdrop-blur-md', 'border-b', 'border-slate-800')
        headerWrapper.classList.add('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-4', 'sm:py-6', 'lg:py-8')
        headerWrapper.children[0].classList.remove('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    }
})


$('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash)
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault()
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target)
                    $target.focus()
                    if ($target.is(':focus')) { // Checking if the target was focused
                        return false
                    } else {
                        $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                        $target.focus() // Set focus again
                    }
                })
            }
        }
    })