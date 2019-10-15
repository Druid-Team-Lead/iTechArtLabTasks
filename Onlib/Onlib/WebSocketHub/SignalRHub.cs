using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace Onlib.WebSocketHub
{
    public class SignalRHub : Hub
    {
        public async Task UpdateComments(int bookId)
        {
            await Clients.All.SendAsync("CommentsChanged", bookId);
        }

        public async Task UpdateBooks()
        {
            await Clients.All.SendAsync("NewBookAdded");
        }

        public async Task NewOrder()
        {
            await Clients.All.SendAsync("OrderCreated");
        }
    }
}