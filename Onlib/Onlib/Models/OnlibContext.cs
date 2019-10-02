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
        public DbSet<UserModel> Users { get; set; }
        public DbSet<BookUserModel> BooksUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CommentModel>()
                .HasOne(b => b.BookModel)
                .WithMany(g => g.Comments)
                .HasForeignKey(s => s.BookId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<BookUserModel>()
                .HasKey(bu => new { bu.BookId, bu.UserId });
            builder.Entity<BookUserModel>()
                .HasOne(b => b.Book)
                .WithMany(u => u.BooksUsers)
                .HasForeignKey(k => k.BookId);
            builder.Entity<BookUserModel>()
                .HasOne(b => b.User)
                .WithMany(u => u.BooksUsers)
                .HasForeignKey(k => k.UserId);
        }
    }
}