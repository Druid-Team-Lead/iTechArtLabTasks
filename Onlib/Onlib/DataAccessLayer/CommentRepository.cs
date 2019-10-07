using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Onlib.Models;

namespace Onlib.DataAccessLayer
{
    public class CommentRepository : GenericRepository<UserCommentModel>, ICommentRepository
    {
        private readonly OnlibContext _onlibContext;
        public CommentRepository(OnlibContext onlibContext) : base(onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public IQueryable<UserCommentModel> GetAll(int bookId)
        {
            var result = from comments in _onlibContext.Comments
                         join userComments in _onlibContext.UsersComments
                         on comments.Id equals userComments.CommentId
                         join users in _onlibContext.Users
                         on userComments.UserId equals users.Id into Details
                         from m in Details.DefaultIfEmpty()
                         select new UserCommentModel
                         {
                             CommentId = comments.Id,
                             Comment = new CommentModel
                             {
                                 Comment = comments.Comment,
                                 BookId = comments.BookId,
                                 Id = comments.Id,
                             },
                             UserId = m.Id,
                             User = new UserModel
                             {
                                 Id = m.Id,
                                 UserName = m.UserName,
                                 FirstName = m.FirstName,
                                 LastName = m.LastName
                             }
                         };
            return result;
        }
    }
}