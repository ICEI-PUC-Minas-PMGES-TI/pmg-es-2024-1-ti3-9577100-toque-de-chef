using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TOQUE.DE.CHEF.Models
{
    [Table("PURCHASE_ITENS")]
    public class Purchase
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("PURCHASE_DATE")]
        public DateTime PurchaseDate { get; set; }

        // Relacionamento com o fornecedor
        [Column("SUPPLIER_ID")]
        public int SupplierId { get; set; }
        public Suplyer Suplyer { get; set; }

        // Lista de itens da compra


    }
}
