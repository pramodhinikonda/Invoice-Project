using System;
using System.Data;

namespace YTS.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IDbConnection Connection { get; }

        IDbTransaction Transaction { get; }

        void Save();
    }
}
