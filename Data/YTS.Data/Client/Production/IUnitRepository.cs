using System;
using System.Collections.Generic;
using YTS.Data.Models;

namespace YTS.Data
{
    public interface IUnitRepository : IRepository<Unit>
    {
        Unit GetUnit(string name);

        List<Unit> GetUnits(Guid organizationID);
    }
}
