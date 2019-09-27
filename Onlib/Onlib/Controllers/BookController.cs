using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Onlib.DataAccessLayer;
using Onlib.Models;

namespace Onlib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repository;

        public BookController(IBookRepository repository)
        {
            _repository = repository;
            //_ = SeedData();
        }

        [HttpGet("[action]")]
        public IEnumerable<BookModel> GetBooks()
        {
            var books = _repository.GetAll();
            return books;
        }

        [HttpPost("[action]")]
        public async Task AddBook([FromBody] BookModel model)
        {
            await _repository.Create(model);
        }

        [HttpGet("[action]/{id}")]
        public async Task<BookModel> GetBook(int id)
        {
            var book = await _repository.GetById(id);
            return book;
        }

        public async Task SeedData()
        {
            await _repository.Create(new BookModel
            {
                Description = "very cool description 1111",
                Title = "Book 1"
            });
            await _repository.Create(new BookModel
            {
                Description = "very cool description 2222",
                Title = "Book 2"
            });
            await _repository.Create(new BookModel
            {
                Description = "very cool description 3333",
                Title = "Book 3"
            });
        }
    }
}