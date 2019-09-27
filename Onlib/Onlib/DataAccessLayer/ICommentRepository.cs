using Onlib.Models;
using System.Linq;

namespace Onlib.DataAccessLayer
{
    public interface ICommentRepository : IGenericRepository<CommentModel>
    {
        IQueryable<CommentModel> GetAll(int bookId);
    }
}
