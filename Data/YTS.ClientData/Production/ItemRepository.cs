using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using YTS.Data;
using YTS.Data.Models;

namespace YTS.ClientData
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IConnectionProvider provider)
           : base(provider)
        {
        }

        public ItemRepository(IUnitOfWork unitOfWork)
           : base(unitOfWork)
        {
        }

        public override IQueryable<Item> All()
        {
            throw new NotImplementedException();
        }

        public override int Count()
        {
            throw new NotImplementedException();
        }

        public override Item Create(Item item)
        {
            UnitOfWork.Connection.ExecuteScalar<int>(
               sql: $"INSERT INTO production.Item(ItemID, OrganizationID, UnitID, Code, Name, Description, Type, SellingRate, HsnSac, IsTaxable, GST, ModifiedDate, ModifiedBy, IsDeleted) VALUES(@ItemID, @OrganizationID, @UnitID, @Code, @Name, @Description, @Type, @SellingRate, @HsnSac, @IsTaxable, @GST, @ModifiedDate, @ModifiedBy, @IsDeleted)",
               param: new { item.ItemID, item.OrganizationID, item.UnitID, item.Code, item.Name, item.Description, item.Type, item.SellingRate, item.HsnSac, item.IsTaxable,item.GST, item.ModifiedDate, item.ModifiedBy, item.IsDeleted },
               transaction: UnitOfWork.Transaction);

            return item;
        }

        public override Item Delete(Item item)
        {
            throw new NotImplementedException();
        }

        public override Item Find(params object[] keys)
        {
            return UnitOfWork.Connection.QuerySingleOrDefault<Item>(
                sql: "SELECT * FROM production.Item WHERE ItemID = @ItemID",
                param: new { ItemID = keys[0] },
                transaction: UnitOfWork.Transaction);
        }

        public Item GetItem(string name)
        {
            return UnitOfWork.Connection.QueryFirstOrDefault<Item>(
                sql: "SELECT * FROM production.Item WHERE Name = @Name",
                param: new { Name = name },
                transaction: UnitOfWork.Transaction);
        }

        public List<Item> GetItems(Guid organizationID)
        {
            return UnitOfWork.Connection.Query<Item>(
                sql: "SELECT * FROM production.Item WHERE OrganizationID = @OrganizationID",
                param: new { OrganizationID = organizationID },
                transaction: UnitOfWork.Transaction).ToList();
        }

        public override Item Update(Item item)
        {
            UnitOfWork.Connection.Execute(
                sql: "UPDATE production.Item SET UnitID = @UnitID, OrganizationID = @OrganizationID, Code = @Code, Name = @Name, Description = @Description, Type = @Type, SellingRate = @SellingRate, HsnSac = @HsnSac, IsTaxable = @IsTaxable, GST = @GST, ModifiedDate = @ModifiedDate, ModifiedBy = @ModifiedBy, IsDeleted = @IsDeleted WHERE ItemID = @ItemID",
                param: new { item.ItemID, item.UnitID, item.OrganizationID, item.Code, item.Name, item.Description, item.Type, item.SellingRate, item.HsnSac, item.IsTaxable, item.GST, item.ModifiedDate, item.ModifiedBy, item.IsDeleted },
                transaction: UnitOfWork.Transaction);

            return item;
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
