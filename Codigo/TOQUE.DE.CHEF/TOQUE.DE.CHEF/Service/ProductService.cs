using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;
using ClosedXML.Excel;

namespace TOQUE.DE.CHEF.Services
{
    public class ProductService
    {
        private readonly Models.Context _context;

        public ProductService(Models.Context context)
        {
            _context = context;
        }

        public Product CreateProduct(ProductDto dto)
        {
            var category = _context.categories.FirstOrDefault(x => x.Id == dto.CategoryId);
            if (category == null)
            {
                throw new ArgumentException($"Categoria com ID '{dto.CategoryId}' não encontrada.");
            }

            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = category
            };

            _context.products.Add(product);
            _context.SaveChanges();

            return product;
        }

        public void DeleteProduct(int id)
        {
            var product = _context.products.FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                throw new InvalidOperationException($"Produto com ID '{id}' não encontrado.");
            }

            product.DeletedAt = DateTime.UtcNow;
            _context.SaveChanges();
        }

        public Product EditProduct(int id, ProductDto dto)
        {
            var product = _context.products.Include(x => x.Category).FirstOrDefault(x => x.Id == id);
            if (product == null)
            {
                throw new InvalidOperationException($"Produto com ID '{id}' não encontrado.");
            }

            var category = _context.categories.FirstOrDefault(x => x.Id == dto.CategoryId);
            if (category == null)
            {
                throw new ArgumentException($"Categoria com ID '{dto.CategoryId}' não encontrada.");
            }

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Category = category;

            _context.SaveChanges();

            return product;
        }

      

        public ApiResponse<Product> GetAllProducts(string search = null, int page = 1, int take = 15)
        {
            var query = _context.products
                .Include(p => p.Category)
                .Where(p => p.DeletedAt == null)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.DeletedAt == null && x.Name.Contains(search));
            }

            var totalRecords = query.Count();
            var products = query.Skip((page - 1) * take).Take(take).ToList();

            return new ApiResponse<Product>
            {
                Count = totalRecords,
                obj = products
            };
        }

        public Product GetProductById(int id)
        {
            var product = _context.products
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id && p.DeletedAt == null);

            if (product == null)
            {
                throw new InvalidOperationException($"Produto com ID '{id}' não encontrado.");
            }

            return product;
        }

        public void ImportExcelProducts(IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                throw new ArgumentException("Arquivo não selecionado ou vazio.");
            }

            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;

                using (var workbook = new XLWorkbook(stream))
                {
                    var worksheet = workbook.Worksheet(1);

                    var rows = worksheet.RowsUsed().Skip(1);

                    foreach (var row in rows)
                    {
                        string name = row.Cell(1).Value.ToString();
                        string categoryName = row.Cell(2).Value.ToString();
                        double price = Convert.ToDouble(row.Cell(3).Value.ToString());
                        string description = row.Cell(4).Value.ToString();

                        var category = _context.categories.FirstOrDefault(x => x.Name == categoryName);
                        if (category == null)
                        {
                            throw new ArgumentException($"Categoria '{categoryName}' não encontrada.");
                        }

                        var product = new Product
                        {
                            Name = name,
                            Description = description,
                            Category = category
                        };

                        _context.products.Add(product);
                    }

                    _context.SaveChanges();
                }
            }
        }
    }
}
