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
            var books = _repository.GetAll();
            return books;
        }

        [HttpPost("[action]")]
        public async Task<int> AddBook([FromBody]BookModel model)
        {
            //if(model.ImageToBeUploaded != null)
            //{
            //    using (var memoryStream = new MemoryStream())
            //    {
            //        await model.ImageToBeUploaded.CopyToAsync(memoryStream);
            //        var imageToBeUploadedByteArray = memoryStream.ToArray();
            //        model.Cover.Image = imageToBeUploadedByteArray;
            //    }
            //}
            model.Cover.Image = Convert.FromBase64String(model.ImageToBeUploaded);
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