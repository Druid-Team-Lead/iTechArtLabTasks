using Onlib.Models;
using System;
using System.Collections.Generic;
using System.Data;

namespace Onlib.DataAccessLayer
{
    public class CommentRepository : IRepository<CommentModel>
    {
        private IDbConnection Connection { get; set; }

        public CommentRepository(IDbConnection connection)
        {
            Connection = connection;
        }

        public IEnumerable<CommentModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public int Create(CommentModel item)
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

        public CommentModel Read(int id)
        {
            throw new NotImplementedException();
        }

        public int Update(CommentModel item)
        {
            throw new NotImplementedException();
        }
    }
}