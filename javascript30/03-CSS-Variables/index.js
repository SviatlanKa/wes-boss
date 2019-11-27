const  inputs = document.querySelectorAll(".controls input");

function handleChangeAndMouseMove(event) {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleChangeAndMouseMove));
inputs.forEach(input => input.addEventListener('mousemove', handleChangeAndMouseMove));