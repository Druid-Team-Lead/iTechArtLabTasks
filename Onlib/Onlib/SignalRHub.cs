using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Onlib
{
    public class SignalRHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}