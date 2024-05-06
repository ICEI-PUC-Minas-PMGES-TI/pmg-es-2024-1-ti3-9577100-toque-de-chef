using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;


namespace TOQUE.DE.CHEF.Services
{
    public class PurchaseItemService
    {
        private readonly Context _context;
        private readonly StockService _stockService;
        private readonly ProductService _productService;


        public PurchaseItemService(Context context, StockService  stockService, ProductService productService)
        {
            _context = context;
            _stockService = stockService;
            _productService = productService;
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

                _productService.UpdateProductStock(dto.ProductId, dto.Quantity);

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
