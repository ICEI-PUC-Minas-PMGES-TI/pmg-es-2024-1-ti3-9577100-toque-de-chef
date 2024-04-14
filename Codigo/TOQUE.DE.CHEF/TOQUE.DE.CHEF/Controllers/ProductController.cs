using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Services;

namespace TOQUE.DE.CHEF.Controllers
{
    public class ProductController : Controller
    {
        private readonly ProductService _productService;

        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllProducts(string search = null, int page = 1, int take = 15)
        {
            return _productService.GetAllProducts(search, page, take);
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] ProductDto dto)
        {
            return _productService.CreateProduct(dto);
        }

        [HttpDelete("Product/deleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            return _productService.DeleteProduct(id);
        }

        [HttpPut("Product/editProduct/{id}")]
        public IActionResult EditProduct(int id, [FromBody] ProductDto dto)
        {
            return _productService.EditProduct(id, dto);
        }

        [HttpGet]
        public IActionResult GetProductById(int id)
        {
            return _productService.GetProductById(id);
        }

        [HttpPost]
        public IActionResult ImportExcelProducts([FromForm] IFormFile file)
        {
            return _productService.ImportExcelProducts(file);
        }
    }
}
