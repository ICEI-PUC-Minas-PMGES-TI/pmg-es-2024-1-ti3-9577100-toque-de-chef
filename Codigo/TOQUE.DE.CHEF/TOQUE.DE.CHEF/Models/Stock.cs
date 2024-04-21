using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("STOCKS")]
    public class Stock
    {
        [Column("ID")]
        public int Id { get; set; }

   
        public Product Product { get; set; }

        [Column("QUANTITY")]
        public int Quantity { get; set; }


        public ICollection<TransactionStockOperation> TransactionStockOperation { get; set; }

    }
}
