using System;
using System.Collections.Generic;
using System.Linq;
using YTS.BusinessObject;
using YTS.ClientData;
using YTS.Data;
using YTS.Metadata;

namespace YTS.Business
{
    public class ItemManager : IDisposable
    {
        private Guid clientID;
        private Guid organizationID;
        private Guid userID;
        private IItemRepository itemRepository;
        private bool disposed = false;

        public ItemManager(Guid clientID, Guid organizationID)
        {
            this.clientID = clientID;
            this.organizationID = organizationID;
            itemRepository = new ItemRepository (new ClientConnectionProvider(clientID));
        }

        public ItemManager(Guid clientID, Guid organizationID, Guid userID)
           : this(clientID, organizationID)
        {
            this.userID = userID;
        }

        public Item GetItem(string name)
        {
            if (clientID == default(Guid))
            {
                throw new ArgumentException($"{nameof(clientID)} is invalid");
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentNullException($"{nameof(name)} is null");
            }

            Data.Models.Item item = itemRepository.GetItem(name);
            if (item == null)
            {
                return null;
            }

            return new Item
            {
                OrganizationID = item.OrganizationID,
                UnitID = item.UnitID,
                Type = item.Type,                
                Code = item.Code,
                Name = item.Name,
                Description = item.Description,
                SellingRate = item.SellingRate,
                HsnSac = item.HsnSac,
                IsTaxable = item.IsTaxable,
                GST = item.GST
            };
        }


        public Item Save(Item item)
        {
            if (item == null)
            {
                throw new ArgumentNullException($"{nameof(item)} is null.");
            }

            Data.Models.Item i;
            if (item.ItemID != Guid.Empty)
            {
                i = itemRepository.Find(item.ItemID);
                i.IsDeleted = item.IsDeleted;
                i.ModifiedBy = userID;
                i.ModifiedDate = DateTime.UtcNow;
                i.Name = item.Name;
                i.OrganizationID = organizationID;
                i.UnitID = item.UnitID;
                i.Type = item.Type;
                i.Code = item.Code;
                i.Name = item.Name;
                i.Description = item.Description;
                i.SellingRate = item.SellingRate;
                i.HsnSac = item.HsnSac;
                i.IsTaxable = item.IsTaxable;
                i.GST = item.GST;
                i.ItemID = item.ItemID;
                itemRepository.Update(i);
            }
            else
            {
                i = itemRepository.Create(new Data.Models.Item
                {
                    IsDeleted = item.IsDeleted,
                    ModifiedBy = userID,
                    ModifiedDate = DateTime.UtcNow,                   
                    OrganizationID = organizationID,
                    UnitID = item.UnitID,
                    Type = item.Type,
                    Code = item.Code,
                    Name = item.Name,
                    Description = item.Description,
                    SellingRate = item.SellingRate,
                    HsnSac = item.HsnSac,
                    IsTaxable = item.IsTaxable,
                    GST = item.GST,
                    ItemID = Guid.NewGuid()
                });

                item.ItemID = i.ItemID;
            }

            itemRepository.Save();
            return item;
        }

        public List<Item> GetItems()
        {
            List<Data.Models.Item> items = itemRepository.GetItems(organizationID);
            return items.Select(t => new Item
            {
                ItemID = t.ItemID,
                OrganizationID = t.OrganizationID,
                UnitID = t.UnitID,
                Type = t.Type,
                Code = t.Code,
                Name = t.Name,
                Description = t.Description,
                SellingRate = t.SellingRate,
                HsnSac = t.HsnSac,
                IsTaxable = t.IsTaxable,
                GST = t.GST
            }).ToList();
        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    itemRepository.Dispose();
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
