using Onlib.Models;

namespace Onlib.DataAccessLayer
{
    public class BookRepository : GenericRepository<BookModel>, IBookRepository
    {
        public BookRepository(OnlibContext onlibContext) : base(onlibContext)
        {

        }
    }
}
