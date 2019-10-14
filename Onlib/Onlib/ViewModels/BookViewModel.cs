using System;
using System.Collections.Generic;

namespace Onlib.ViewModels
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
        public string Description { get; set; }
        public int CopiesNumber { get; set; }
        public byte[] Cover { get; set; }
        public string ImageToBeUploaded { get; set; }
    }
}