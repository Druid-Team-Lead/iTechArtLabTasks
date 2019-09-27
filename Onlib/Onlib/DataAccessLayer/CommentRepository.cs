using System.Linq;
using Microsoft.EntityFrameworkCore;
using Onlib.Models;

namespace Onlib.DataAccessLayer
{
    public class CommentRepository : GenericRepository<CommentModel>, ICommentRepository
    {
        private readonly OnlibContext _onlibContext;
        public CommentRepository(OnlibContext onlibContext) : base(onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public IQueryable<CommentModel> GetAll(int bookId)
        {
            return _onlibContext.Set<CommentModel>().AsNoTracking().Where(x => x.BookId == bookId);
        }
    }
}