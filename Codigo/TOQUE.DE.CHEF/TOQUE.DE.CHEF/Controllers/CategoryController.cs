using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Controllers
{
    [Authorize]
    public class CategoryController : Controller
    {
        public List<Category> listCategories { get; set; }

        private readonly Context _context;

        public CategoryController(Context context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getAllCategories(string search = null, int page = 1, int take = 15)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine(userId);
            listCategories = _context.categories.ToList();
            int totalRegistros = 0;
            int skip = (page - 1) * take;


            totalRegistros = listCategories.Count;

            if (string.IsNullOrEmpty(search).Equals(false))
            {
                listCategories = listCategories.Where(x => x.Name.Contains(search) || x.Description.Contains(search)).ToList();
            }

            return Json(
                    new
                    {
                        obj = listCategories.Skip(skip).Take(take),
                        count = totalRegistros
                    }
                );
        }

        [HttpGet]
        public string addCategory(string name, string description)
        {
            try
            {
                Category category = new Category();
                category.Name = name;
                category.Description = description;

                _context.categories.Add(category);
                _context.SaveChanges();
                return "OK";
            }
            catch {
                return "ERROR";
            }
        }

        [HttpDelete]
        public string deleteCategory(int id) {
            try
            {
                _context.Remove(_context.categories.Single(x => x.Id == id));
                _context.SaveChanges();
                return "OK";
            }
            catch 
            {
                return "ERRO";
            }
        }

        [HttpPut]
        public string editCategory(int id,string newName,string newDescription) {
            try
            {
                Category categoryToEdit = _context.categories.FirstOrDefault(x => x.Id == id);
                categoryToEdit.Name = newName;
                categoryToEdit.Description = newDescription;
                _context.categories.Update(categoryToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch 
            {
                return "ERRO";
            }
        }

        [HttpGet]
        public JsonResult getCategoryById(int id) {            
            Category category = _context.categories.FirstOrDefault(x => x.Id == id);
            return Json(category);
        }
    }
}
