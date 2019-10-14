namespace Onlib.ViewModels
{
    public class CommentViewModel
    {
        public UserViewModel Author { get; set; }
        public string Comment { get; set; }
        public int BookId { get; set; }
    }
}