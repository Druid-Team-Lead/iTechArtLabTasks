using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Onlib.DataAccessLayer;
using Onlib.Models;

namespace Onlib.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repository;

        public CommentController(ICommentRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("[action]/{bookId}")]
        public IEnumerable<CommentModel> GetComments(int bookId)
        {
            var comments = _repository.GetAll(bookId);
            return comments;
        }

        [HttpPost("[action]")]
        public async Task AddComment([FromBody] CommentModel model)
        {
            await _repository.Create(model);
        }
    }
}