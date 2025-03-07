const dateForTitle = new Date();
document.title = `${dateForTitle.getDate().toString().padStart(2, "0")}.${(dateForTitle.getMonth() + 1).toString().padStart(2, "0")}.${dateForTitle.getFullYear()}, ${dateForTitle.getHours().toString().padStart(2, "0")}:${dateForTitle.getMinutes().toString().padStart(2, "0")}`

const mainContent = document.querySelector("#main-content");
const userMessageContainer = document.querySelector("#user-message-field");
const sendUserMessageButton = document.querySelector("#send-user-message-btn");
const messageContainer = document.querySelector("#messages");

const userMessages = {
    ":)": {
        "botResponse": "Hey :)",
        "responseTimeInMilliseconds": 1000
    },
    "/audiotest": {
        "botResponse": `<audio controls><source src="music.mp3" type="audio/mp3"></audio>`,
        "responseTimeInMilliseconds": 2000
    }
}

function getFormattedTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

document.querySelector("#bot-small-timestamp").textContent = getFormattedTime();

function sendMessage(msg) {
    if (msg.trim() != "" && msg.trim() != undefined && msg.trim() != null) {
        const userMessageDiv = document.createElement("div");
        userMessageDiv.id = "user-message";
        userMessageDiv.textContent = msg;

        const userMessageTimeStampDiv = document.createElement("div");
        userMessageTimeStampDiv.id = "user-small-timestamp";
        userMessageTimeStampDiv.textContent = getFormattedTime();

        userMessageDiv.appendChild(userMessageTimeStampDiv);
        messageContainer.appendChild(userMessageDiv);
        respondToUser(msg);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    };
    userMessageContainer.value = "";
};

function respondToUser(userMessage) {
    const responseDiv = document.createElement("div");
    if (userMessage in userMessages) {
        const response = userMessages[userMessage];
        const botResponse = response.botResponse;
        const responseTime = response.responseTimeInMilliseconds;
        const circleDiv1 = document.createElement("div");
        circleDiv1.id = "circle-1";
        const circleDiv2 = document.createElement("div");
        circleDiv2.id = "circle-2";
        const circleDiv3 = document.createElement("div");
        circleDiv3.id = "circle-3";
        responseDiv.id = "bot-responding-message-placeholder";
        responseDiv.appendChild(circleDiv1);
        responseDiv.appendChild(circleDiv2);
        responseDiv.appendChild(circleDiv3);
        messageContainer.appendChild(responseDiv);
        setTimeout(() => {
            responseDiv.id = "bot-message";
            responseDiv.innerHTML = botResponse;
            const timestampDiv = document.createElement("div");
            timestampDiv.id = "bot-small-timestamp";
            timestampDiv.textContent = getFormattedTime();
            responseDiv.appendChild(timestampDiv);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }, responseTime);
    };
};

function adaptToScreen() {
    mainContent.style.setProperty("width", window.innerWidth + "px");
    mainContent.style.setProperty("height", window.innerHeight + "px");
    userMessageContainer.style.setProperty("font-size", (((window.innerHeight * 0.1) * 0.4) * 0.4) + "px");
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