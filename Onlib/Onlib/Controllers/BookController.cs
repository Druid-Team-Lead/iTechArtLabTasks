using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
        }

        [HttpGet("[action]")]
        public IEnumerable<BookModel> GetBooks()
        {
            var books = _repository.GetAllBooksWithCovers();
            return books;
        }

        [HttpPost("[action]")]
        public async Task<int> AddBook([FromBody]BookModel model)
        {
            if(model.ImageToBeUploaded != null)
            {
                model.ImageToBeUploaded = model.ImageToBeUploaded.Replace("data:image/png;base64,", "");
                model.Cover = new BookCoverModel
                {
                    Image = Convert.FromBase64String(model.ImageToBeUploaded)
                };
            }
            
            var isSaved = await _repository.Create(model);
            return isSaved;
        }

        [HttpGet("[action]/{id}")]
        public async Task<BookModel> GetBook(int id)
        {
            var book = await _repository.GetById(id);
            return book;
        }
    }
}