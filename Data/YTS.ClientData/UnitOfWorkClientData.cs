using System;
using System.Data;
using YTS.Data;

namespace YTS.ClientData
{
    public class UnitOfWorkClientData : IUnitOfWork
    {
        private IDbConnection connection;
        private IDbTransaction transaction;
        private bool disposed;

        public UnitOfWorkClientData(IConnectionProvider provider)
        {
            connection = provider.GetConnection();
            connection.Open();
            transaction = connection.BeginTransaction();
        }

        public IDbConnection Connection
        {
            get
            {
                return connection;
            }
        }

        public IDbTransaction Transaction
        {
            get
            {
                return transaction;
            }
        }

        public void Save()
        {
            try
            {
                transaction.Commit();
            }
            catch
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                transaction.Dispose();
                transaction = connection.BeginTransaction();
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
                    if (transaction != null)
                    {
                        transaction.Dispose();
                        transaction = null;
                    }
                    if (connection != null)
                    {
                        connection.Dispose();
                        connection = null;
                    }
                }

                disposed = true;
            }
        }
    }
}
