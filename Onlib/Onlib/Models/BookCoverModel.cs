namespace Onlib.Models
{
    public class BookCoverModel
    {
        public int Id { get; set; }
        public byte[] Image { get; set; }
        public int BookId { get; set; }
        public BookModel BookModel { get; set; }
    }
}