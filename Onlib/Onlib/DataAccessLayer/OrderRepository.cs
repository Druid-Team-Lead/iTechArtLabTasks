using Microsoft.EntityFrameworkCore;
using Onlib.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public class OrderRepository : GenericRepository<BookUserModel>, IOrderRepository
    {
        private OnlibContext _onlibContext;

        public OrderRepository(OnlibContext onlibContext) : base(onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public IQueryable<BookUserModel> GetAllOrders(int userId)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.UserId == userId
                        join books in _onlibContext.Books
                        on orders.BookId equals books.Id
                        select new BookUserModel
                        {
                            BookId = orders.BookId,
                            Book = new BookModel
                            {
                                Title = books.Title
                            },
                            BookStatus = orders.BookStatus,
                            StatusActivateTime = orders.StatusActivateTime,
                            UserId = orders.UserId
                        };
            return query;
        }

        public async Task<BookUserModel> GetOrderOrReceive(BookUserModel bookUser)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookUser.BookId && orders.UserId == bookUser.UserId
                        select orders;
            return query.Any() ? await query.FirstAsync() : null;
        }

        public async Task<int> Order(BookUserModel bookUser)
        {
            bookUser.BookStatus = "Booked";
            bookUser.StatusActivateTime = DateTime.Now;

            await _onlibContext.Set<BookUserModel>().AddAsync(bookUser);

            // one book was taken so we should remove one from interface
            var query = from books in _onlibContext.Books
                        where books.Id == bookUser.BookId
                        select books;

            foreach (BookModel book in query)
            {
                book.CopiesNumber -= 1;
            }

            var isSaved = await _onlibContext.SaveChangesAsync();
            return isSaved;
        }

        public async Task<int> Recevie(BookUserModel bookUser)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookUser.BookId && orders.UserId == bookUser.UserId
                        select orders;

            foreach (BookUserModel order in query)
            {
                order.StatusActivateTime = DateTime.Now;
                order.BookStatus = "Received";
            }

            var isSaved = await _onlibContext.SaveChangesAsync();
            return isSaved;
        }

        public async Task<int> ReturnOrderOrReceive(BookUserModel bookUser)
        {
            var query = from orders in _onlibContext.BooksUsers
                        where orders.BookId == bookUser.BookId && orders.UserId == bookUser.UserId
                        select orders;

            _onlibContext.BooksUsers.RemoveRange(query);

            // one book was returned so we should add one to interface
            var queryBooks = from books in _onlibContext.Books
                             where books.Id == bookUser.BookId
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
