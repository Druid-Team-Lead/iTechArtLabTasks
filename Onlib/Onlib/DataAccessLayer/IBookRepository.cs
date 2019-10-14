using Onlib.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public interface IBookRepository : IGenericRepository<BookModel>
    {
        IQueryable<BookModel> GetAllBooksWithCovers();
        Task<BookModel> GetByIdWithCover(int id);
        Task<int> Order(BookUserModel order);
        Task<int> Recevie(BookUserModel recevie);
        Task<BookUserModel> GetOrderOrReceive(BookUserModel order);
        Task<int> ReturnOrderOrReceive(BookUserModel recevie);
        IQueryable<BookUserModel> GetAllOrders();
    }
}