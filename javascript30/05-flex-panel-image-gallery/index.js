const panels = document.querySelectorAll('.panel');
console.log(panels);

function handleClick() {
    console.log("hell")
    this.classList.toggle('open');
}

function handleTransitionEnd(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}

panels.forEach(panel => panel.addEventListener('click', handleClick));
panels.forEach(panel => panel.addEventListener('transitionend', handleTransitionEnd))