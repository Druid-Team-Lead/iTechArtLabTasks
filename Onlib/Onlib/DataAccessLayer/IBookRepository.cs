using Onlib.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public interface IBookRepository : IGenericRepository<BookModel>
    {
        IQueryable<BookModel> GetAllBooksWithCovers();
        Task<BookModel> GetByIdWithCover(int id);
    }
}