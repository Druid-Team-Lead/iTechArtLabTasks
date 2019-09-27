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
            //CreateAsync();
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

        public async void CreateAsync()
        {
            var booki = new BookModel
            {
                Description = "first category - very cool description",
                Title = "First category"
            };
            await _repository.Create(booki);
        }
    }
}