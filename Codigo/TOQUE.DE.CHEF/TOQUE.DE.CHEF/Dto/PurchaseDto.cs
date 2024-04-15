namespace TOQUE.DE.CHEF.Dto
{
	public class PurchaseDto
	{
        public int SuplyerId { get; set; }
        public List<PurchaseItemDto> PurchaseItems { get; set; }
    }
}

