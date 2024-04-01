using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;

namespace TOQUE.DE.CHEF.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [Column("ID")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Name must be between 2 and 100 characters.")]
        [Column("NAME")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [StringLength(100, MinimumLength = 1)]
        [Column("EMAIL")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required.")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be between 6 and 100 characters.")]
        [Column("PASSWORD")]
        public string Password { get; set; }

        [Column("ACTIVE")]
        public bool Active { get; set; }

        [Required(ErrorMessage = "Type is required.")]
        [StringLength(50, ErrorMessage = "Type must not exceed 50 characters.")]
        [Column("TYPE")]
        public string Type { get; set; }
    }
}
