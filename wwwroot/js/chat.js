"use strict";

//объект, для подключения к хабу по url
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Отключить кнопку отправки пока соединение не будет установленно
document.getElementById("sendButton").disabled = true;

//при получении запроса с ReceiveMessage
connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} say ${message}`;
});

//начать подключение
connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
    console.log("connected");
}).catch((err) => {
    return console.error(err.toString());
});

//привязать кнопку к запросу к хабу на сервер
document.getElementById("sendButton").addEventListener("click", (event) => {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", user, message).catch((err) =>{
        return console.error(err.toString());
    });
    event.preventDefault();
});