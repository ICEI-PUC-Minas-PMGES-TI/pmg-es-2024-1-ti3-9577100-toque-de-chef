
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Dto
{
	public class RegisterUserDto
	{
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }

        public static User FromRegisterUserDto(RegisterUserDto dto)
        {
            return new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Type = dto.Type,
                Active = true // Set Active to true by default
            };
        }
    }
}

