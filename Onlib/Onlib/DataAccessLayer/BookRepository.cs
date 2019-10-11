using System.Linq;
using Onlib.Models;

namespace Onlib.DataAccessLayer
{
    public class BookRepository : GenericRepository<BookModel>, IBookRepository
    {
        private OnlibContext _onlibContext;

        public BookRepository(OnlibContext onlibContext) : base(onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public IQueryable<BookModel> GetAllBooksWithCovers()
        {
            var result = from books in _onlibContext.Books
                         join covers in _onlibContext.BooksCovers
                         on books.Id equals covers.BookId into Covers
                         from m in Covers.DefaultIfEmpty()
                         select new BookModel
                         {
                             Id = books.Id,
                             Author = books.Author,
                             CopiesNumber = books.CopiesNumber,
                             Cover = m == null ? null : new BookCoverModel
                             {
                                 Id = m.Id,
                                 Image = m.Image
                             },
                             Description = books.Description,
                             PublishDate = books.PublishDate,
                             Title = books.Title
                         };
            return result;
        }
    }
}
