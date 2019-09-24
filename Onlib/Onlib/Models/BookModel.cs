using System;

namespace Onlib.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
        public string Description { get; set; }
        public int CopiesNumber { get; set; }
    }
}