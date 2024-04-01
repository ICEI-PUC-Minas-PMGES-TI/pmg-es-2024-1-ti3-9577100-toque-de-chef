
using TOQUE.DE.CHEF.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TOQUE.DE.CHEF.Dto;

namespace TOQUE.DE.CHEF.Controllers
{
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly Context _context;

        public AuthController(IConfiguration config, Context context)
        {
            _config = config;
            _context = context;

        }

        private string GenerateJwtToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {

                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


        [HttpPost]
        public IActionResult Register([FromBody] RegisterUserDto user)
        {

            try
            {
                var registerUser = RegisterUserDto.FromRegisterUserDto(user);
                _context.users.Add(registerUser);
                _context.SaveChanges();
                var token = GenerateJwtToken(registerUser.Id);
                return Ok(new {Token = token, User=registerUser});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = "Falha ao registrar!" ,message= ex.Message });
            }
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginUserDto data)
        { 

            var user = _context.users.FirstOrDefault(u => u.Email == data.Email && u.Password == data.Password);

            if (user == null)
                return Unauthorized(); 

            var token = GenerateJwtToken(user.Id);

            return Ok(new { Token = token, User= user });
        }

        
    }
}
