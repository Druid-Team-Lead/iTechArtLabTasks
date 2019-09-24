namespace Onlib.Models
{
    public class UserModel
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserStatus UserStatus { get; set; }
    }

    //TODO:Power up enum.
    public enum UserStatus
    {
        Active,
        Blocked
    }
}