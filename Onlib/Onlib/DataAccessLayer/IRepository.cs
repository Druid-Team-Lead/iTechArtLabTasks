using System;
using System.Collections.Generic;

namespace Onlib.DataAccessLayer
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> GetAll();
        int Create(T item);
        T Read(int id);
        int Update(T item);
        bool Delete(int id);
    }
}