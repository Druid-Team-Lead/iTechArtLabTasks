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
        private readonly IBookRepository _repository;

        public BookController(IBookRepository repository)
        {
            _repository = repository;
            //CreateAsync();
        }

        [HttpGet("[action]")]
        public IEnumerable<BookModel> GetBooks()
        {
            var get = _repository.GetAll();
            return get;
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