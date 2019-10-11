using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<BookModel> GetByIdWithCover(int id)
        {
            var result = from books in _onlibContext.Books
                         where books.Id == id
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
            return await result.FirstAsync();
        }

        public async Task<BookUserModel> GetOrderOrReceive(int bookId, int userId)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookId && orders.UserId == userId
                        select orders;
            return await query.FirstAsync();
        }

        public async Task<int> Order(int bookId, int userId)
        {
            var order = new BookUserModel
            {
                BookId = bookId,
                UserId = userId,
                StatusActivateTime = DateTime.Now,
                BookStatus = "Booked"
            };
            await _onlibContext.Set<BookUserModel>().AddAsync(order);

            // one book was taken so we should remove one from interface
            var query = from books in _onlibContext.Books
                        where books.Id == bookId
                        select books;

            foreach (BookModel book in query)
            {
                book.CopiesNumber -= 1;
            }

            var isSaved = await _onlibContext.SaveChangesAsync();
            return isSaved;
        }

        public async Task<int> Recevie(int bookId, int userId)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookId && orders.UserId == userId
                        select orders;
            
            foreach(BookUserModel order in query)
            {
                order.StatusActivateTime = DateTime.Now;
                order.BookStatus = "Received";
            }

            var isSaved = await _onlibContext.SaveChangesAsync();
            return isSaved;
        }

        public async Task<int> ReturnOrderOrReceive(int bookId, int userId)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookId && orders.UserId == userId
                        select orders;

            _onlibContext.BooksUsers.RemoveRange(query);

            // one book was returned so we should add one to interface
            var queryBooks = from books in _onlibContext.Books
                             where books.Id == bookId
                             select books;

            foreach (BookModel book in queryBooks)
            {
                book.CopiesNumber += 1;
            }

            int isReturned = await _onlibContext.SaveChangesAsync();

            return isReturned;
        }
    }
}