/*
    Класс ChatHub является конвеером для передачи сообщения
    от клиента к серверу и обратно

    Hub - управляет подключениямси, группами и обменом сообщениями

    SendMessage может вызываться подключенным клиентом, чтобы отправить сообщение всем клиентам
*/

using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }        
    }
}