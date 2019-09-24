using Microsoft.EntityFrameworkCore;

namespace Onlib.Models
{
    public class OnlibContext : DbContext
    {
        public OnlibContext(DbContextOptions<OnlibContext> options)
            : base(options)
        {
        }

        public DbSet<BookModel> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}