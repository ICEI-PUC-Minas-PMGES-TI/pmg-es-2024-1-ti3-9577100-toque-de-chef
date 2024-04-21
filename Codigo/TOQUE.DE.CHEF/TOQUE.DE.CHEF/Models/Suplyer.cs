using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("SUPLYERS")]
    public class Suplyer
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("NAME")]
        public string Name { get; set; }

        [Column("EMAIL")]
        public string Email { get; set; }

        [Column("PHONE")]
        public string Phone { get; set; }

        [Column("DESCRIPTION")]
        public string Description { get; set; }

        [Column("DELETED_AT")]
        public DateTime? DeletedAt { get; set; }

        public ICollection<Purchase> Purchases { get; set; }
    }
}
