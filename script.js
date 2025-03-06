document.title = location.toString().length + " :]";

const mainContent = document.querySelector("#main-content");
const userMessageContainer = document.querySelector("#user-message-field");
const sendUserMessageButton = document.querySelector("#send-user-message-btn");
const messageContainer = document.querySelector("#messages");
let dateee = new Date();
document.querySelector("#bot-small-timestamp").textContent = `${dateee.getHours()}:${dateee.getMinutes()}`;

function sendMessage(msg) {
    const userMessageDiv = document.createElement("div");
    userMessageDiv.id = "user-message";
    userMessageDiv.textContent = msg;
    const userMessageTimeStampDiv = document.createElement("div");
    userMessageTimeStampDiv.id = "user-small-timestamp";
    let dateee = new Date();
    userMessageTimeStampDiv.textContent = `${dateee.getHours()}:${dateee.getMinutes()}`;
    userMessageDiv.appendChild(userMessageTimeStampDiv);
    messageContainer.appendChild(userMessageDiv);
    userMessageContainer.value = "";
};

function adaptToScreen() {
    mainContent.style.setProperty("width", window.innerWidth + "px");
    mainContent.style.setProperty("height", window.innerHeight + "px");
    userMessageContainer.style.setProperty("font-size", (((window.innerHeight * 0.1) * 0.4) * 0.45) + "px");
    userMessageContainer.style.setProperty("padding", `${window.innerHeight * 0.005}px ${window.innerHeight * 0.01}px`);
    messageContainer.style.setProperty("padding", `0 ${window.innerWidth * 0.02}px`);
};

["load", "resize"].forEach(event => {
    window.addEventListener(event, adaptToScreen);
});

if (navigator.userAgentData.mobile) {
    sendUserMessageButton.addEventListener("touchstart", () => {
        sendMessage(userMessageContainer.value);
    });
} else {
    sendUserMessageButton.addEventListener("click", () => {
        sendMessage(userMessageContainer.value);
    });
};