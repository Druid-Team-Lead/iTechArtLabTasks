using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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
        public BookCoverModel Cover { get; set; }
        [NotMapped]
        public string ImageToBeUploaded { get; set; }
        public ICollection<CommentModel> Comments { get; set; }
        public ICollection<BookUserModel> BooksUsers { get; set; }
    }
}