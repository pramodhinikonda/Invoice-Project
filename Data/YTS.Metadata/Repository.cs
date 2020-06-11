using System;
using System.Linq;
using YTS.Data;

namespace YTS.Metadata
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private bool shareContext;
        private IUnitOfWork uow;
        private bool disposed = false;

        public Repository()
            : this(new MetadataConnectionProvider())
        {
        }

        public Repository(IConnectionProvider provider)
        {
            shareContext = false;
            uow = new UnitOfWorkMetadata(provider);
        }

        protected Repository(IUnitOfWork uow)
        {
            shareContext = true;
            this.uow = uow;
        }

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return uow;
            }
        }

        public abstract int Count();

        public abstract IQueryable<T> All();

        public abstract T Find(params object[] keys);

        public abstract T Create(T t);

        public abstract T Update(T t);

        public abstract T Delete(T t);

        public void Save()
        {
            uow.Save();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (!shareContext && UnitOfWork != null)
                    {
                        uow.Dispose();
                    }
                }
            }

            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
