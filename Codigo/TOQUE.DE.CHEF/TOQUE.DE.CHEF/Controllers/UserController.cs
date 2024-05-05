using TOQUE.DE.CHEF.Models;
using TOQUE.DE.CHEF.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Enum;

namespace TOQUE.DE.CHEF.Controllers
{
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
       
        public JsonResult GetUser(string search = null, int page = 1, int take = 15)
        {
            var result = _userService.GetUsers(search, page, take);
            int totalRegistros = result.Count;

            return Json(
                    new ApiResponse<User>
                    {
                        obj = result,
                        Count = totalRegistros
                    }
                );
        }

        [HttpPost]
       
        public string CreateUser(string name, string email, string password)
        {
            return _userService.CreateUser(name, email, password, true, UserRole.Pending);
        }

        [HttpGet]
        public JsonResult GetUserById(int id)
        {
            User user = _userService.GetUserById(id);
            return Json(user);
        }

        [HttpPut]
        public string EditUser([FromBody] UserEditDto dto)
        {
            return _userService.EditUser(dto, User);
        }

        [HttpGet]
        public User GetCurrentUser()
        {
            return _userService.GetCurrentUser(User);
        }
    }
}
