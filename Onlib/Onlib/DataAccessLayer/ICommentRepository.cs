using Onlib.Models;
using System.Linq;

namespace Onlib.DataAccessLayer
{
    public interface ICommentRepository : IGenericRepository<UserCommentModel>
    {
        IQueryable<UserCommentModel> GetAll(int bookId);
    }
}
