using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;


namespace TOQUE.DE.CHEF.Services
{
    public class PurchaseItemService
    {
        private readonly Context _context;

        public PurchaseItemService(Context context)
        {
            _context = context;
        }

        public PurchaseItem CreatePurchaseItem(Purchase purchase, PurchaseItemDto dto)
        {
            try
            {
                var product = _context.products.FirstOrDefault(x => x.Id == dto.ProductId);

                if (product == null)
                {
                    throw new ArgumentException($"Produto com ID '{dto.ProductId}' não encontrado.");
                }

                var purchaseItem = new PurchaseItem
                {
                    Quantity = dto.Quantity,
                    UnitPrice = dto.UnitPrice,
                    Product = product,
                    Purchase = purchase 
                };

                _context.purchaseItems.Add(purchaseItem);
                _context.SaveChanges();

                return purchaseItem;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao criar item de compra: {ex.Message}");
            }
        }



        public PurchaseItem EditPurchaseItem(int itemId, PurchaseItemDto dto)
        {
            try
            {
                var item = _context.purchaseItems.FirstOrDefault(pi => pi.Product.Id == itemId);
                if (item == null)
                {
                    throw new ArgumentException($"Item de compra com ID '{itemId}' não encontrado.");
                }

                item.Quantity = dto.Quantity;
                item.UnitPrice = dto.UnitPrice;

                _context.SaveChanges();

                return item;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao editar item de compra: {ex.Message}");
            }
        }
    }
}
