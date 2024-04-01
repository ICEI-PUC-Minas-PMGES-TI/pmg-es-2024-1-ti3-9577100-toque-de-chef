using Microsoft.AspNetCore.Mvc;

namespace TOQUE.DE.CHEF.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
