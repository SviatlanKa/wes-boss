const  inputs = document.querySelectorAll(".controls input");

function handleChangeAndMouseMove() {
    const suffix = this.dataset.sizing || '';
    console.log(document.documentElement);
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleChangeAndMouseMove));
inputs.forEach(input => input.addEventListener('mousemove', handleChangeAndMouseMove));