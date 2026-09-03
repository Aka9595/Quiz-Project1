const generateBtn = document.getElementById('generateBtn');
const palette_container = document.querySelector('.palette_container');

generateBtn.addEventListener('click',generatePalette);
palette_container.addEventListener('click',(e) => {
    if(e.target.classList.contains('copy_btn')){
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target))
        .catch((err) => console.log(err))
    }else if(e.target.classList.contains('color')){
        const hexValue = e.target.nextElementSibling.querySelector(".hex_value").textContent;
    
        navigator.clipboard.writeText(hexValue)
        .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy_btn")))
        .catch((err) => console.log(err))
    
    }

});

function showCopySuccess(element) {
    element.classList.remove("far","fa-copy");
    element.classList.add("fas","fa-check");

    element.style.color = "#48bb78";

    setTimeout(() => {
        element.classList.remove("fas","fa-check");
    element.classList.add("far","fa-copy");

    element.style.color = "";
    }, 1000);
}

function generatePalette() {
   
    const colors = [];
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColors())
    }
    
    updatePaletteDisplay(colors);

}

function generateRandomColors() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
        
    }
    return color;
}

function updatePaletteDisplay(colors) {
    const colorCard = document.querySelectorAll('.color_card');
    colorCard.forEach((card, index) => {

        const color = colors[index];
        const colorBg = card.querySelector('.color');
        const hexValue = card.querySelector('.hex_value');

        colorBg.style.backgroundColor = color;
        hexValue.textContent = color;


    });
}

//Default palette
generatePalette();