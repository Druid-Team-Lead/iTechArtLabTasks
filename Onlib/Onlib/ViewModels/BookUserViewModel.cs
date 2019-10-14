using System;

namespace Onlib.ViewModels
{
    public class BookUserViewModel
    {
        public int BookId { get; set; }
        public int UserId { get; set; }
        public string BookStatus { get; set; }
        public DateTime StatusActivateTime { get; set; }
    }
}