using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Onlib.DataAccessLayer;
using Onlib.Models;
using Onlib.ViewModels;

namespace Onlib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repository;
        private readonly IMapper _mapper;

        public BookController(IBookRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public IEnumerable<BookViewModel> GetBooks()
        {
            var books = _repository.GetAllBooksWithCovers();
            var mapped = _mapper.Map<IQueryable<BookModel>, IEnumerable<BookViewModel>>(books);
            return mapped;
        }

        [HttpPost("[action]")]
        public async Task<int> AddBook([FromBody]BookViewModel model)
        {
            if(model.ImageToBeUploaded != null)
            {
                var base64 = Regex.Replace(model.ImageToBeUploaded, "data:image/(png|jpeg|jpg);base64,", "");
                model.ImageToBeUploaded = base64;
                model.Cover = Convert.FromBase64String(model.ImageToBeUploaded);
            }

            var mapped = _mapper.Map<BookViewModel, BookModel>(model);
            var isSaved = await _repository.Create(mapped);
            return isSaved;
        }

        [HttpGet("[action]/{id}")]
        public async Task<BookViewModel> GetBook(int id)
        {
            var book = await _repository.GetByIdWithCover(id);
            var mapped = _mapper.Map<BookModel, BookViewModel>(book);
            return mapped;
        }

        [HttpPost("[action]")]
        public async Task<int> Order(int bookId, int userId)
        {
            var isSaved = await _repository.Order(bookId, userId);
            return isSaved;
        }

        [HttpPost("[action]")]
        public async Task<int> Receive(int bookId, int userId)
        {
            var isSaved = await _repository.Recevie(bookId, userId);
            return isSaved;
        }

        [HttpGet("[action]")]
        public async Task<BookUserModel> GetOrderOrReceive(int bookId, int userId)
        {
            var result = await _repository.GetOrderOrReceive(bookId, userId);
            return result;
        }

        [HttpPost("[action]")]
        public async Task<int> Return(int bookId, int userId)
        {
            var isReturned = await _repository.ReturnOrderOrReceive(bookId, userId);
            return isReturned;
        }
    }
}