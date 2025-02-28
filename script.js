const hamburgerMenu = document.querySelector("#hamburger-icon");
const sideNavBar = document.querySelector("#fixed-sidebar-menu");
const landingPageWordPlaceholder = document.querySelector("#word");

if (navigator.userAgentData.mobile) {
    hamburgerMenu.addEventListener("touchstart", () => {
        hamburgerMenu.classList.toggle("activated");
        sideNavBar.classList.toggle("open");
    });
} else {
    hamburgerMenu.addEventListener("click", () => {
        hamburgerMenu.classList.toggle("activated");
        sideNavBar.classList.toggle("open");
    });
};

document.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop >= document.documentElement.scrollHeight / 10) {
        document.querySelector("#fixed-top-bar").style.setProperty("min-height", 69.5 / 1.75 + "px");
        document.querySelector("#fixed-top-bar").style.setProperty("max-height", 69.5 / 1.75 + "px");
    } else {
        document.querySelector("#fixed-top-bar").style.setProperty("min-height", 69.5 + "px");
        document.querySelector("#fixed-top-bar").style.setProperty("max-height", 69.5 + "px");
    };
});

const wordArray = ["Verantwortung", "Nachhaltigkeit", "Klimawandel", "Demokratie", "Rechtsextremismus", "Migrationspolitik", "Digitalisierung", "Verkehrswende", "Europapolitik"];

function landingPageWordAnimation() {
    let randomIndex = Math.round(Math.random() * (wordArray.length - 1));
    let word = wordArray[randomIndex];
    let splitWord = word.split("");
    landingPageWordPlaceholder.style.setProperty("background-image", `url("${word}.jpg")`);
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
                            }
                        }, 100 * j);
                    });
                }, 2000);
            };
        }, 100 * i);
    });
};

landingPageWordAnimation();