using Onlib.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public interface IBookRepository : IGenericRepository<BookModel>
    {
        IQueryable<BookModel> GetAllBooksWithCovers();
        Task<BookModel> GetByIdWithCover(int id);
        Task<int> Order(int bookId, int userId);
        Task<int> Recevie(int bookId, int userId);
        Task<BookUserModel> GetOrderOrReceive(int bookId, int userId);
        Task<int> ReturnOrderOrReceive(int bookId, int userId);
    }
}