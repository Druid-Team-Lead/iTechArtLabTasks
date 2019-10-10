using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll();
        Task<TEntity> GetById(int id);
        Task<int> Create(TEntity entity);
        Task<int> Update(int id, TEntity entity);
        Task Delete(int id);
    }
}