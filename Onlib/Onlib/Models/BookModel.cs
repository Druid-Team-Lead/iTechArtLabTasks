using Microsoft.EntityFrameworkCore;

namespace Onlib.Models
{
    class BookContext : DbContext
    {
        public DbSet<BookModel> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookModel>().Property(x => x.Id).IsRequired();
            modelBuilder.Entity<BookModel>().Property(x => x.Title).IsRequired();
        }
    }

    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}