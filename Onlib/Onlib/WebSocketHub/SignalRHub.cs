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
    }
}