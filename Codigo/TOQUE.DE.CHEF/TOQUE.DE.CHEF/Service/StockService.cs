using System;
using System.Linq;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Services
{
    public class StockService
    {
        private readonly Context _context;

        public StockService(Context context)
        {
            _context = context;
        }

        public Stock CreateStock(StockDto dto)
        {
            try
            {
                var product = _context.products.FirstOrDefault(x => x.Id == dto.ProductId);

                if (product == null)
                {
                    throw new ArgumentException($"Produto com ID '{dto.ProductId}' não encontrado.");
                }

                var stock = new Stock
                {
                    Quantity = dto.Quantity,
                    Product = product
                };

                _context.stocks.Add(stock);
                _context.SaveChanges();

                return stock;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao criar o estoque: {ex.Message}");
            }
        }

        public void UpdateStock(int productId, int quantity)
        {
            try
            {
                var stock = GetStock(productId);

                if (stock == null)
                {
                    CreateStock(new StockDto { ProductId = productId, Quantity = quantity });
                }
                else
                {
                    stock.Quantity += quantity;
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao atualizar o estoque: {ex.Message}");
            }
        }

        public Stock GetStock(int productId)
        {
            try
            {
                return _context.stocks.FirstOrDefault(s => s.Product.Id == productId);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter o estoque: {ex.Message}");
            }
        }
    }
}
