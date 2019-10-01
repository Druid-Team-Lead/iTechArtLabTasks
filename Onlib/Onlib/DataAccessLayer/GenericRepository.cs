using Microsoft.EntityFrameworkCore;
using Onlib.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Onlib.DataAccessLayer
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly OnlibContext _onlibContext;

        public GenericRepository(OnlibContext onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _onlibContext.Set<TEntity>().AsNoTracking();
        }

        public async Task<int> Create(TEntity entity)
        {
            await _onlibContext.Set<TEntity>().AddAsync(entity);
            var isSaved = await _onlibContext.SaveChangesAsync();
            return isSaved;
        }

        public async Task Update(int id, TEntity entity)
        {
            _onlibContext.Set<TEntity>().Update(entity);
            await _onlibContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var entity = await GetById(id);
            _onlibContext.Set<TEntity>().Remove(entity);
            await _onlibContext.SaveChangesAsync();
        }

        public async Task<TEntity> GetById(int id)
        {
            return await _onlibContext.Set<TEntity>().FindAsync(id);
        }
    }
}