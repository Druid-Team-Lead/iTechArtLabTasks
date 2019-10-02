using Onlib.Models;

namespace Onlib.DataAccessLayer
{
    public interface IUserRepository : IGenericRepository<UserModel>
    {
        UserModel Authenticate(string username, string password);
        UserModel Create(UserModel user, string password);
        void Update(UserModel user, string password = null);
    }
}