const panels = document.querySelectorAll('panel');

function handleClick() {
    this.classList.toggle('open');
}

panels.forEach(panel => 'click', handleClick);