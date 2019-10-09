using System.Collections.Generic;

namespace Onlib.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserStatus { get; set; }
        public bool IsModerator { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public ICollection<BookUserModel> BooksUsers { get; set; }
        public ICollection<UserCommentModel> UsersComments { get; set; }
    }
}