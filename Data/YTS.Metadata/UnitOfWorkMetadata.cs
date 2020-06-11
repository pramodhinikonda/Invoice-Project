using System;
using System.Data;
using YTS.Data;

namespace YTS.Metadata
{
    public class UnitOfWorkMetadata : IUnitOfWork
    {
        private bool disposed;

        public UnitOfWorkMetadata(IConnectionProvider provider)
        {
            Connection = provider.GetConnection();
            Connection.Open();
            Transaction = Connection.BeginTransaction();
        }

        public IDbConnection Connection { get; private set; }

        public IDbTransaction Transaction { get; private set; }

        public void Save()
        {
            try
            {
                Transaction.Commit();
            }
            catch
            {
                Transaction.Rollback();
                throw;
            }
            finally
            {
                Transaction.Dispose();
                Transaction = Connection.BeginTransaction();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (Transaction != null)
                    {
                        Transaction.Dispose();
                        Transaction = null;
                    }
                    if (Connection != null)
                    {
                        Connection.Dispose();
                        Connection = null;
                    }
                }

                disposed = true;
            }
        }
    }
}
