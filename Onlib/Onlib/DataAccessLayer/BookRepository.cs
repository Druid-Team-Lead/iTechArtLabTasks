using Onlib.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace Onlib.DataAccessLayer
{
    public class BookRepository : IRepository<BookModel>
    {
        private IDbConnection Connection { get; set; }

        public BookRepository(IDbConnection connection)
        {
            Connection = connection;
        }

        public IEnumerable<BookModel> GetAll()
        {
            var books = new List<BookModel>
            {
                new BookModel{ Id = 1, Title = "Book1" },
                new BookModel{ Id = 2, Title = "Book2" }
            };
            return books;
        }

        public int Create(BookModel item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {

        }

        public BookModel Read(int id)
        {
            throw new NotImplementedException();
        }

        public int Update(BookModel item)
        {
            throw new NotImplementedException();
        }
    }
}