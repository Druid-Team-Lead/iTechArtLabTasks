using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Onlib.DataAccessLayer;
using Onlib.Models;

namespace Onlib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IRepository<BookModel> _books;

        public BookController(IRepository<BookModel> books)
        {
            this._books = books;
        }

        [HttpGet("[action]")]
        public IEnumerable<BookModel> GetBooks()
        {
            var books = _books.GetAll();
            return books;
        }
    }
}