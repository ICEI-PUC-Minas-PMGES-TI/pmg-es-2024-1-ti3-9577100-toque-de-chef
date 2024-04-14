using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("PRODUCTS")]
    public class Product
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("NAME")]
        public string Name { get; set; }

        [Column("DESCRIPTION")]
        public string Description { get; set; }

        [Column("UNIT_PRICE")]
        public double Unit_Price { get; set; }

        public Category Category { get; set; }

        [Column("DELETED_AT")]
        public DateTime? DeletedAt { get; set; }
    }
}
