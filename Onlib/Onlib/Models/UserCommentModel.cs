namespace Onlib.Models
{
    public class UserCommentModel
    {
        public int CommentId { get; set; }
        public CommentModel Comment { get; set; }
        public int UserId { get; set; }
        public UserModel User { get; set; }
    }
}