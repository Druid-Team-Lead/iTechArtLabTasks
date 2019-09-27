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
        public DbSet<CommentModel> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CommentModel>()
                .HasOne(b => b.BookModel)
                .WithMany(g => g.Comments)
                .HasForeignKey(s => s.BookId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}