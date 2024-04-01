using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Models;

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
        public string addProduct(string name, string description)
        {
            try
            {
                Product product = new Product();
                product.Name = name;
                product.Description = description;

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
    }
}
