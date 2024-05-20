using TOQUE.DE.CHEF.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using TOQUE.DE.CHEF.Dto;
using Safety.Web.Models;
using TOQUE.DE.CHEF.Enum;

namespace TOQUE.DE.CHEF.Services
{
    public class UserService
    {
        private readonly Context _context;

        public UserService(Context context)
        {
            _context = context;
        }

        public List<User> GetUsers(string search = null, int page = 1, int take = 15)
        {
            List<User> listUsers = _context.users.ToList();
            int totalRegistros = 0;
            int skip = (page - 1) * take;

            totalRegistros = listUsers.Count;

            if (!string.IsNullOrEmpty(search))
            {
                listUsers = listUsers.Where(x => x.Name.Contains(search) || x.Email.Contains(search)).ToList();
            }

            return listUsers.Skip(skip).Take(take).ToList();
        }

         public string CreateUser(string name, string email, string password, bool active, UserRole role)
        {
            try
            {
                if (!PasswordMeetsCriteria(password))
                {
                    return "ERROR: A senha deve conter letras, números, caracteres especiais e ter mais de 4 caracteres.";
                }

                User newUser = new User();
                newUser.Name = name;
                newUser.Email = email;
                newUser.Password = Cryptography.Encrypt(password);
                newUser.Active = active;

                newUser.Type = role;

                _context.users.Add(newUser);
                _context.SaveChanges();

                return "OK";
            }
            catch
            {
                return "ERROR";
            }
        }

        private bool PasswordMeetsCriteria(string password)
        {
            if (password.Length < 5)
                return false;

            if (!password.Any(char.IsLetter))
                return false;

            if (!password.Any(char.IsDigit))
                return false;

            if (!password.Any(ch => !char.IsLetterOrDigit(ch)))
                return false;

            return true;
        }

        public User GetUserById(int id)
        {
            return _context.users.FirstOrDefault(x => x.Id == id);
        }


        public List<UserInfoDto> GetUsersByType(int userType)
        {
            var users = _context.users.Where(u => u.Type == (UserRole)userType).ToList();

            if (users.Any())
            {
                var usersInfoDto = users.Select(u => new UserInfoDto
                {
                    Name = u.Name,
                    Id= u.Id,
                    Email = u.Email,
                    Type = (int)u.Type
                }).ToList();

                return usersInfoDto;
            }
            else
            {
                return null; 
            }
        }

        public string EditUser(UserEditDto dto, ClaimsPrincipal User)
        {
            try
            {
                var userId = Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);

                User UserToEdit = _context.users.FirstOrDefault(x => x.Id == userId);

                UserToEdit.Name = dto.Name;

                if (!string.IsNullOrEmpty(dto.Password))
                {
                    UserToEdit.Password = Cryptography.Encrypt(dto.Password);
                }

                _context.users.Update(UserToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }

        public string EditUserAcess(int id, int userType)
        {
            try
            {

                User UserToEdit = _context.users.FirstOrDefault(x => x.Id == id);
                UserToEdit.Type = (UserRole)userType;
                UserToEdit.Password = UserToEdit.Password;

                _context.users.Update(UserToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }


      

        public User GetCurrentUser(ClaimsPrincipal User)
        {
            var userId = Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
            return _context.users.Single(x => x.Id == userId);
        }
    }
}
