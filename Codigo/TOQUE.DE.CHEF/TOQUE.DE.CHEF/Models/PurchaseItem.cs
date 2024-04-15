using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("PURCHASE_ITENS")]
    public class PurchaseItem
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("QUANTITY")]
        public int Quantity { get; set; }

        [Column("UNIT_PRICE", TypeName = "decimal(18, 2)")]
        public decimal UnitPrice { get; set; }

        [NotMapped] 
        public decimal TotalPrice => UnitPrice * Quantity;

        public Product Product { get; set; }

        public Purchase Purchase { get; set; }

    }
}
