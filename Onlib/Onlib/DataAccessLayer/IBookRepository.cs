using Onlib.Models;
using System.Linq;

namespace Onlib.DataAccessLayer
{
    public interface IBookRepository : IGenericRepository<BookModel>
    {
        IQueryable<BookModel> GetAllBooksWithCovers();
    }
}