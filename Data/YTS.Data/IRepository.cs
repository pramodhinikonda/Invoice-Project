using System;
using System.Linq;

namespace YTS.Data
{
    public interface IRepository : IDisposable
    {
        void Save();
    }

    public interface IRepository<T> : IRepository where T : class
    {
        int Count();

        IQueryable<T> All();

        T Find(params object[] keys);

        T Create(T t);

        T Update(T t);

        T Delete(T t);
    }
}
