const hamburgerMenu = document.querySelector("#hamburger-icon");
const landingPageWordPlaceholder = document.querySelector("#word");

window.addEventListener("resize", () => {
    location.reload();
});

const wordArray = ["Verantwortung", "Nachhaltigkeit", "Klimawandel", "Demokratie", "Rechtsextremismus", "Migrationspolitik", "Digitalisierung", "Verkehrswende", "Europapolitik"];

function landingPageWordAnimation() {
    let randomIndex = Math.round(Math.random() * (wordArray.length - 1));
    let word = wordArray[randomIndex];
    let splitWord = word.split("");
    landingPageWordPlaceholder.style.setProperty("background-image", `url("${word.toLowerCase()}.jpg")`);
    splitWord.forEach((char, i) => {
        setTimeout(() => {
            landingPageWordPlaceholder.textContent += char;
            
            if (i === splitWord.length - 1) {
                setTimeout(() => {
                    splitWord.forEach((_, j) => {
                        setTimeout(() => {
                            landingPageWordPlaceholder.textContent = word.slice(0, -j - 1);
                            
                            if (j === splitWord.length - 1) {
                                setTimeout(landingPageWordAnimation, 500);
                            };
                        }, 100 * j);
                    });
                }, 2000);
            };
        }, 100 * i);
    });
};

landingPageWordAnimation();