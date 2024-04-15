namespace TOQUE.DE.CHEF.Models
{
    public class ApiResponse<T>
    {
        public int Count { get; set; }
        public List<T> obj { get; set; }
    }
}