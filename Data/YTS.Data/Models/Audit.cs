using System;

namespace YTS.Data.Models
{
    public abstract class Audit
    {
        public virtual DateTime ModifiedDate { get; set; }

        public virtual Guid ModifiedBy { get; set; }

        public virtual bool IsDeleted { get; set; }
    }
}
