const dateForTitle = new Date();
document.title = `PolitBot [${dateForTitle.getDate().toString().padStart(2, "0")}.${(dateForTitle.getMonth() + 1).toString().padStart(2, "0")}.${dateForTitle.getFullYear()}, ${dateForTitle.getHours().toString().padStart(2, "0")}:${dateForTitle.getMinutes().toString().padStart(2, "0")}]`;

const mainContent = document.querySelector("#main-content");
const userMessageContainer = document.querySelector("#user-message-field");
const sendUserMessageButton = document.querySelector("#send-user-message-btn");
const messageContainer = document.querySelector("#messages");
const randomFavicon = Math.floor(Math.random() * 13);
document.querySelectorAll("link").forEach(link => {
    if (link.rel === "shortcut icon") {
        link.href = `favicon-${randomFavicon}.png`;
    };
});

const userMessages = {
    "/audiotest": {
        "botResponse": `<audio controls><source src="music.mp3" type="audio/mp3"></audio>`,
        "responseTimeInMilliseconds": 2000
    },
    "/favicon": {
        "botResponse": `
        <img src="${document.querySelector('link[rel="icon"], link[rel="shortcut icon"]').href}" width="40%" height="40%">
        <br>
        <a href="${document.querySelector('link[rel="icon"], link[rel="shortcut icon"]').href}" download="${document.title.split(" ")[0]}_website_icon.png">Download</a>`,
        "responseTimeInMilliseconds": 2000
    },
    "Viel reden, wenig sagen": {
        "botResponse": `
        "Viel reden, wenig sagen" ist ein in 2019 veröffentlichter Artikel von <strong>Oliver Georgi</strong>.<br>
        In besagtem Artikel kritisiert Georgi die Sprechweise von Politikern, und verspottet sie zwischendurch.<br><br>
        Hier sind Themen, die dir vielleicht weiterhelfen:<br>
        <a class="bot-message-nav-link" onclick="sendMessage(this.textContent)">Oliver Georgi</a>
        <a class="bot-message-nav-link" onclick="sendMessage(this.textContent)">zentrale Aussagen "Viel reden, wenig sagen"</a>
        <a class="bot-message-nav-link" onclick="sendMessage(this.textContent)">Kritik Georgis "Viel reden, wenig sagen"</a>`,
        "responseTimeInMilliseconds": 2500
    }
};

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
    };
    messageContainer.scrollTop = messageContainer.scrollHeight;
    userMessageContainer.value = "";
};

function respondToUser(userMessage) {
    let response, botResponse, responseTime;
    const responseDiv = document.createElement("div");
    if (userMessage in userMessages) {
        response = userMessages[userMessage];
        botResponse = response.botResponse;
        responseTime = response.responseTimeInMilliseconds;
    } else {
        botResponse = `Es tut mir leid, aber ich habe noch keine Antwort auf:<br>"${userMessage}".`;
        responseTime = 2000;
    };
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

function adaptToScreen() {
    mainContent.style.setProperty("width", window.innerWidth + "px");
    mainContent.style.setProperty("height", window.innerHeight + "px");
    userMessageContainer.style.setProperty("font-size", (((window.innerHeight * 0.1) * 0.4) * 0.4) + "px");
    userMessageContainer.style.setProperty("padding", `${window.innerHeight * 0.005}px ${window.innerHeight * 0.01}px`);
    messageContainer.style.setProperty("padding", `0 ${window.innerWidth * 0.01}px`);
    document.querySelectorAll(".bot-message-nav-link").forEach(link => {
        console.log(link.textContent);
    });
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