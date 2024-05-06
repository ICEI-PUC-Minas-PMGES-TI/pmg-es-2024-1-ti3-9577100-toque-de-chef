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
                query = query.Where(x => x.Suplyer.Name.Contains(search));
            }

            query = query.OrderByDescending(p => p.PurchaseDate);

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

                if (purchase.SuplyerId != dto.SuplyerId)
                {
                    purchase.Suplyer = _context.suplyers.FirstOrDefault(s => s.Id == dto.SuplyerId);
                }

                // Verificar itens de compra existentes
                foreach (var existingPurchaseItem in purchase.PurchaseItems.ToList())
                {
                    var itemDto = dto.PurchaseItems.FirstOrDefault(dtoItem => dtoItem.id == existingPurchaseItem.Purchase.Id);
                    if (itemDto != null)
                    {
                        // Se o item de compra existente foi encontrado no DTO, verifica se houve alterações e atualiza-o se necessário
                        if (existingPurchaseItem.UnitPrice != itemDto.UnitPrice || existingPurchaseItem.Quantity != itemDto.Quantity)
                        {
                            _purchaseItemService.EditPurchaseItem(existingPurchaseItem.Id, itemDto);
                        }
                    }
                    else
                    {
                        // Se o item de compra existente não foi encontrado no DTO, remove-o
                        purchase.PurchaseItems.Remove(existingPurchaseItem);
                        _context.purchaseItems.Remove(existingPurchaseItem);
                    }
                }

                // Adicionar novos itens de compra
                foreach (var itemDto in dto.PurchaseItems)
                {
                    if (!purchase.PurchaseItems.Any(pi => pi.Product.Id == itemDto.ProductId))
                    {
                        var purchaseItem = _purchaseItemService.CreatePurchaseItem(purchase, itemDto);
                        purchase.PurchaseItems.Add(purchaseItem);
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
