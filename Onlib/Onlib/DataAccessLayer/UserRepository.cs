using Onlib.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace Onlib.DataAccessLayer
{
    public class UserRepository : IRepository<UserModel>
    {
        private IDbConnection Connection { get; set; }

        public UserRepository(IDbConnection connection)
        {
            Connection = connection;
        }

        public IEnumerable<UserModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public int Create(UserModel item)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public UserModel Read(int id)
        {
            throw new NotImplementedException();
        }

        public int Update(UserModel item)
        {
            throw new NotImplementedException();
        }
    }
}