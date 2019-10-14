using System.Collections.Generic;
using System.Linq;
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
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repository;
        private readonly IMapper _mapper;

        public CommentController(ICommentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("[action]/{bookId}")]
        public IEnumerable<CommentViewModel> GetComments(int bookId)
        {
            var comments = _repository.GetAll(bookId);
            var mapped = _mapper.Map<IQueryable<UserCommentModel>, IEnumerable<CommentViewModel>>(comments);
            return mapped;
        }

        [HttpPost("[action]")]
        public async Task<int> AddComment([FromBody]CommentViewModel model)
        {
            var mapped = _mapper.Map<CommentViewModel,UserCommentModel>(model);
            var isSaved = await _repository.Create(mapped);
            return isSaved;
        }
    }
}