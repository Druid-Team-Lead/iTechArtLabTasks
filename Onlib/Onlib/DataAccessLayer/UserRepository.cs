using Onlib.Models;
using System.Linq;
using System;
using Microsoft.EntityFrameworkCore;

namespace Onlib.DataAccessLayer
{
    public class UserRepository : GenericRepository<UserModel>, IUserRepository
    {
        private readonly OnlibContext _onlibContext;

        public UserRepository(OnlibContext onlibContext) : base(onlibContext)
        {
            _onlibContext = onlibContext;
        }

        public UserModel Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _onlibContext.Set<UserModel>().AsNoTracking().Where(x => x.UserName == username).FirstOrDefault();

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public UserModel Create(UserModel user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password is required");

            if (_onlibContext.Users.Any(x => x.UserName == user.UserName))
                throw new Exception("Username " + user.UserName + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _onlibContext.Users.Add(user);
            _onlibContext.SaveChanges();

            return user;
        }

        public void Update(UserModel userParam, string password = null)
        {
            var user = _onlibContext.Users.Find(userParam.Id);

            if (user == null)
                throw new Exception("User not found");

            if (userParam.UserName != user.UserName)
            {
                // username has changed so check if the new username is already taken
                if (_onlibContext.Users.Any(x => x.UserName == userParam.UserName))
                    throw new ArgumentException("Username " + userParam.UserName + " is already taken");
            }

            // update user properties
            user.FirstName = userParam.FirstName;
            user.LastName = userParam.LastName;
            user.UserName = userParam.UserName;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _onlibContext.Users.Update(user);
            _onlibContext.SaveChanges();
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}