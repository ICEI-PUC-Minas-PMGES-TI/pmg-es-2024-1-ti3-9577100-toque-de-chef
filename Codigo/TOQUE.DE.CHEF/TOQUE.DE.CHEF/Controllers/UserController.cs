using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TOQUE.DE.CHEF.Dto;

namespace TOQUE.DE.CHEF.Controllers
{
    public class UserController : Controller
    {
        public List<User> listUsers { get; set; }

        private readonly Context _context;

        public UserController(Context context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getUser(string search = null, int page = 1, int take = 15)
        {
            listUsers = _context.users.ToList();
            int totalRegistros = 0;
            int skip = (page - 1) * take;


            totalRegistros = listUsers.Count;

            if (string.IsNullOrEmpty(search).Equals(false))
            {
                listUsers = listUsers.Where(x => x.Name.Contains(search) || x.Email.Contains(search)).ToList();
            }

            return Json(
                    new
                    {
                        obj = listUsers.Skip(skip).Take(take),
                        count = totalRegistros
                    }
                );
        }

        [HttpPost]
        public string createUser(string name, string email, string password, bool active, string type)
        {
            try
            {
                User newUser = new User();
                newUser.Name = name;
                newUser.Email = email;
                newUser.Password = password;
                newUser.Active = active;
                newUser.Type = type;

                _context.users.Add(newUser);
                _context.SaveChanges();

                return "OK";
            }
            catch
            {
                return "ERROR";
            }
        }

       
        [HttpGet]
        public JsonResult getUserById(int id)
        {
            User User = _context.users.FirstOrDefault(x => x.Id == id);
            return Json(User);
        }


        [HttpPut]
        public string editUser([FromBody] UserEditDto dto)
        {
            try
            {
                var userId = Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

                User UserToEdit = _context.users.FirstOrDefault(x => x.Id == userId);

                UserToEdit.Name = dto.Name;
                UserToEdit.Password = dto.Password;
                _context.users.Update(UserToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }

        [HttpGet]
        public User getCurrentUser()
        {

            var userId = Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            return _context.users.Single(x => x.Id == userId);
        }
    }
}
