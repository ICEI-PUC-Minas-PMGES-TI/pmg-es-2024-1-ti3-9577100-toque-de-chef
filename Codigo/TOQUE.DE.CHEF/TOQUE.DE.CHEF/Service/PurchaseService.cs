using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;


namespace TOQUE.DE.CHEF.Services
{
    public class PurchaseService
    {
        private readonly Context _context;
        private readonly PurchaseItemService _purchaseItemService;

        public PurchaseService(Context context, PurchaseItemService purchaseItemService)
        {
            _context = context;
            _purchaseItemService = purchaseItemService;
        }

        public Purchase CreatePurchase(PurchaseDto dto)
        {
            try
            {
                var suplyer = _context.suplyers.FirstOrDefault(x => x.Id == dto.SuplyerId);
                if (suplyer == null)
                {
                    throw new ArgumentException($"Fornecedor com ID '{dto.SuplyerId}' não encontrado.");
                }

                var purchase = new Purchase
                {
                    PurchaseDate = DateTime.UtcNow,
                    Suplyer = suplyer,
                    PurchaseItems = new List<PurchaseItem>()
                };
                _context.purchases.Add(purchase);

                foreach (var itemDto in dto.PurchaseItems)
                {
                    var purchaseItem = _purchaseItemService.CreatePurchaseItem(purchase, itemDto);
                    purchase.PurchaseItems.Add(purchaseItem);
                }
                
                _context.SaveChanges();

                return purchase;
            }
            catch (Exception ex)
            {
                if (ex.InnerException != null)
                {
                    throw new Exception($"Erro ao criar compra: {ex.InnerException.Message}", ex.InnerException);
                }
                else
                {
                    throw new Exception($"Erro ao criar compra: {ex.Message}");
                }
            }
        }


        public ApiResponse<Purchase> GetAllPurchases(string search = null, int page = 1, int take = 15)
        {
            var query = _context.purchases
                .Include(p => p.Suplyer)
                .Include(p => p.PurchaseItems)
                .ThenInclude(pi => pi.Product)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                // Adicione aqui as condições de pesquisa específicas para compras, se necessário
            }

            var totalRecords = query.Count();
            var purchases = query.Skip((page - 1) * take).Take(take).ToList();

            return new ApiResponse<Purchase>
            {
                Count = totalRecords,
                obj = purchases
            };
        }

        public Purchase EditPurchase(int purchaseId, PurchaseDto dto)
        {
            try
            {
                var purchase = _context.purchases
                    .Include(p => p.PurchaseItems)
                    .FirstOrDefault(p => p.Id == purchaseId);

                if (purchase == null)
                {
                    throw new ArgumentException($"Compra com ID '{purchaseId}' não encontrada.");
                }

                foreach (var itemDto in dto.PurchaseItems)
                {
                    var existingPurchaseItem = purchase.PurchaseItems.FirstOrDefault(pi => pi.Product.Id == itemDto.ProductId);

                    if (existingPurchaseItem != null)
                    {
                        _purchaseItemService.EditPurchaseItem(existingPurchaseItem.Id, itemDto);
                    }
                    else
                    {
                        var purchaseItem = _purchaseItemService.CreatePurchaseItem(purchase, itemDto);
                        purchase.PurchaseItems.Add(purchaseItem);
                    }
                }

                foreach (var existingPurchaseItem in purchase.PurchaseItems.ToList())
                {
                    if (!dto.PurchaseItems.Any(itemDto => itemDto.ProductId == existingPurchaseItem.Product.Id))
                    {
                        purchase.PurchaseItems.Remove(existingPurchaseItem);
                        _context.purchaseItems.Remove(existingPurchaseItem); 
                    }
                }

                _context.SaveChanges();

                return purchase;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao editar compra: {ex.Message}");
            }
        }

    }
}
