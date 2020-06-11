using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
    public class UnitManager : IDisposable
    {
        private Guid clientID;
        private Guid organizationID;
        private Guid userID;
        private IUnitRepository unitRepository;
        private bool disposed = false;

        public UnitManager(Guid clientID, Guid organizationID)
        {
            this.clientID = clientID;
            this.organizationID = organizationID;
            unitRepository = new UnitRepository(new ClientConnectionProvider(clientID));
        }

        public UnitManager(Guid clientID, Guid organizationID, Guid userID)
            : this(clientID, organizationID)
        {
            this.userID = userID;
        }

        public Unit GetUnit(string name)
        {
            if (clientID == default(Guid))
            {
                throw new ArgumentException($"{nameof(clientID)} is invalid");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null");
            }

            Data.Models.Unit unit = unitRepository.GetUnit(name);
            if (unit == null)
            {
                return null;
            }

            return new Unit
            {
                Name = unit.Name,
                OrganizationID = unit.OrganizationID,
                Type = (UnitType)unit.Type,
                UnitID = unit.UnitID
            };
        }

        public Unit Save(Unit unit)
        {
            if (unit == null)
            {
                throw new ArgumentNullException($"{nameof(unit)} is null.");
            }

            Data.Models.Unit u;
            if (unit.UnitID != Guid.Empty)
            {
                u = unitRepository.Find(unit.UnitID);
                u.IsDeleted = unit.IsDeleted;
                u.ModifiedBy = userID;
                u.ModifiedDate = DateTime.UtcNow;
                u.Name = unit.Name;
                u.OrganizationID = organizationID;
                u.Type = (int)unit.Type;
                u.UnitID = unit.UnitID;
                unitRepository.Update(u);
            }
            else
            {
                u = unitRepository.Create(new Data.Models.Unit
                {
                    IsDeleted = unit.IsDeleted,
                    ModifiedBy = userID,
                    ModifiedDate = DateTime.UtcNow,
                    Name = unit.Name,
                    OrganizationID = organizationID,
                    Type = (int)unit.Type,
                    UnitID = Guid.NewGuid()
                });

                unit.UnitID = u.UnitID;
            }

            unitRepository.Save();
            return unit;
        }

        public List<Unit> GetUnits()
        {
            List<Data.Models.Unit> units = unitRepository.GetUnits(organizationID);
            return units.Select(t => new Unit
            {
                IsDeleted = t.IsDeleted,
                Name = t.Name,
                OrganizationID = t.OrganizationID,
                Type = (UnitType)t.Type,
                UnitID = t.UnitID
            }).ToList();
        }

        public bool Delete(Guid unitID)
        {
            Data.Models.Unit u = unitRepository.Find(unitID);
            u.IsDeleted = true;
            unitRepository.Update(u);
            unitRepository.Save();
            return true;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    unitRepository.Dispose();
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
