using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Controllers
{
    public class ProductController : Controller
    {
        private readonly Models.Context _context;

        public ProductController(Models.Context context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
    public IActionResult GetAllProducts(string search = null, int page = 1, int take = 15)
    {
        try
        {
            var query = _context.products.Include(p => p.Category).Where(p => p.DeletedAt == null).AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Description.Contains(search));
            }

            var products = query.Skip((page - 1) * take).Take(take).ToList();
            var totalRecords = query.Count();

            

            return Json(new { obj = products, count = totalRecords });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar produtos: {ex.Message}");
        }
    }


    [HttpPost]
        public IActionResult createProduct([FromBody] ProductDto dto)
        {
            try
            {
                var category = _context.categories.FirstOrDefault(x => x.Id == dto.CategoryId);
                if (category == null)
                {
                    return BadRequest($"Categoria com ID '{dto.CategoryId}' não encontrada.");
                }

                var product = new Product
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Unit_Price = dto.UnitPrice,
                    Category = category
                };

                _context.products.Add(product);
                _context.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao adicionar produto: {ex.Message}");
            }
        }

        [HttpDelete("Product/deleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            try
            {
                var product = _context.products.FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return NotFound($"Produto com ID '{id}' não encontrado.");
                }

                product.DeletedAt = DateTime.UtcNow;

                _context.SaveChanges();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao excluir produto: {ex.Message}");
            }
        }


        [HttpPut("Product/editProduct/{id}")]
        public IActionResult EditProduct(int id, [FromBody] ProductDto dto)
        {
            try
            {
                var product = _context.products.Include(x => x.Category).FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return NotFound($"Produto com ID '{id}' não encontrado.");
                }

                var category = _context.categories.FirstOrDefault(x => x.Id == dto.CategoryId);
                if (category == null)
                {
                    return BadRequest($"Categoria com ID '{dto.CategoryId}' não encontrada.");
                }

                product.Name = dto.Name;
                product.Description = dto.Description;
                product.Unit_Price = dto.UnitPrice;
                product.Category = category;

                _context.SaveChanges();
                return Ok("Produto atualizado com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao atualizar produto: {ex.Message}");
            }
        }


        [HttpGet]
        public IActionResult GetProductById(int id)
        {
            try
            {
                var product = _context.products.FirstOrDefault(x => x.Id == id);
                if (product == null)
                {
                    return NotFound($"Produto com ID '{id}' não encontrado.");
                }

                return Json(product);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao recuperar produto: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult ImportExcelProducts(IFormFile file)
        {
            try
            {
                if (file == null || file.Length <= 0)
                {
                    return BadRequest("Arquivo não selecionado ou vazio.");
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
                                return BadRequest($"Categoria '{categoryName}' não encontrada.");
                            }

                            var product = new Product
                            {
                                Name = name,
                                Description = description,
                                Unit_Price = price,
                                Category = category
                            };

                            _context.products.Add(product);
                        }

                        _context.SaveChanges();
                    }
                }

                return Ok("Produtos importados com sucesso.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao importar produtos: {ex.Message}");
            }
        }
    }
}
