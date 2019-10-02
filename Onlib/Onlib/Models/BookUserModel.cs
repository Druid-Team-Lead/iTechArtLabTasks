using System;

namespace Onlib.Models
{
    public class BookUserModel
    {
        public int BookId { get; set; }
        public BookModel Book { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
        public string BookStatus { get; set; }
        public DateTime StatusActivateTime { get; set; }
    }
}