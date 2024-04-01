using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Models;
using ClosedXML.Excel;

namespace TOQUE.DE.CHEF.Controllers
{
    public class ProductController : Controller
    {
        public List<Product> listProducts { get; set; }

        private readonly Context _context;

        public ProductController(Context context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getAllProducts(string search = null, int page = 1, int take = 15)
        {
            listProducts = _context.products.ToList();
            int totalRegistros = 0;
            int skip = (page - 1) * take;

            totalRegistros = listProducts.Count;

            if (string.IsNullOrEmpty(search).Equals(false))
            {
                listProducts = listProducts.Where(x => x.Name.Contains(search) || x.Description.Contains(search)).ToList();
            }

            return Json(
                    new
                    {
                        obj = listProducts.Skip(skip).Take(take),
                        count = totalRegistros
                    }
                );
        }

        [HttpGet]
        public string addProduct(string name, string description, double preco, string categoria)
        {
            try
            {
                Category category = _context.categories.FirstOrDefault(x => x.Name.Equals(categoria));
                Product product = new Product();
                product.Name = name;
                product.Description = description;
                product.Unit_Price = preco;
                product.Category_id = category.Id;
                _context.products.Add(product);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERROR";
            }
        }

        [HttpDelete]
        public string deleteProduct(int id)
        {
            try
            {
                _context.Remove(_context.products.Single(x => x.Id == id));
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }

        [HttpPut]
        public string editProduct(int id, string newName, string newDescription)
        {
            try
            {
                Product productToEdit = _context.products.FirstOrDefault(x => x.Id == id);
                productToEdit.Name = newName;
                productToEdit.Description = newDescription;
                _context.products.Update(productToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }

        [HttpGet]
        public JsonResult getProductById(int id)
        {
            Product product = _context.products.FirstOrDefault(x => x.Id == id);
            return Json(product);
        }

        [HttpPost]
        public IActionResult importExcelProducts(IFormFile file) {
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
                        var worksheet = workbook.Worksheet(1); // Assumindo que os dados estão na primeira planilha

                        var rows = worksheet.RowsUsed().Skip(1); // Ignorar o cabeçalho

                        foreach (var row in rows)
                        {
                            // Ler os dados da linha
                            string nome = row.Cell(1).Value.ToString();
                            string categoria = row.Cell(2).Value.ToString();
                            double preco = Convert.ToDouble(row.Cell(3).Value.ToString());
                            string descricao = row.Cell(4).Value.ToString();

                            // Verificar se a categoria existe
                            var category = _context.categories.FirstOrDefault(x => x.Name == categoria);
                            if (category == null)
                            {
                                // Se a categoria não existir, você pode criar aqui
                                // Ou lidar com isso de acordo com sua lógica de negócios
                                // Por enquanto, vamos supor que a categoria já existe
                                return BadRequest($"Categoria '{categoria}' não encontrada.");
                            }

                            // Criar um novo produto
                            var product = new Product
                            {
                                Name = nome,
                                Description = descricao,
                                Unit_Price = preco,
                                Category_id = category.Id
                            };

                            // Adicionar produto ao contexto
                            _context.products.Add(product);
                        }

                        // Salvar mudanças no banco de dados
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
