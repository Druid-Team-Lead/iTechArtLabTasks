using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
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
                var base64 = Regex.Replace(model.ImageToBeUploaded, "data:image/(png|jpeg|jpg);base64,", "");
                model.ImageToBeUploaded = base64;
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
            var book = await _repository.GetByIdWithCover(id);
            return book;
        }
    }
}