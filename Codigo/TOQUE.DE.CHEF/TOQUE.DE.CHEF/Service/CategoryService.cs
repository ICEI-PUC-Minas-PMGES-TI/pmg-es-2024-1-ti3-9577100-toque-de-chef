using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Services
{
    public class CategoryService
    {
        private readonly Context _context;

        public CategoryService(Context context)
        {
            _context = context;
        }

        public Category CreateCategory(CategoryDto dto)
        {
            var category = new Category
            {
                Name = dto.Name,
                Description = dto.Description
            };

            _context.categories.Add(category);
            _context.SaveChanges();

            return category;
        }

        public void DeleteCategory(int id)
        {
            var category = _context.categories.FirstOrDefault(x => x.Id == id);

            if (category == null)
            {
                throw new InvalidOperationException($"Category with ID '{id}' not found.");
            }

            category.DeletedAt = DateTime.UtcNow; 
            _context.SaveChanges();
        }

        public Category EditCategory(int id, CategoryDto dto)
        {
            var category = _context.categories.FirstOrDefault(x => x.Id == id);
            if (category == null)
            {
                throw new InvalidOperationException($"Category with ID '{id}' not found.");
            }

            category.Name = dto.Name;
            category.Description = dto.Description;

            _context.SaveChanges();

            return category;
        }

       public ApiResponse<Category> GetAllCategories(string search = null, int page = 1, int take = 15)
        {
            var query = _context.categories
        .Include(c => c.Products)
        .Where(x => x.DeletedAt == null)
        .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Description.Contains(search));
            }

            query = query.OrderBy(x => x.Name);

            var totalRecords = query.Count();
            var categories = query.Skip((page - 1) * take).Take(take).ToList();

            return new ApiResponse<Category>
            {
                Count = totalRecords,
                obj = categories
            };
        }

        public Category GetCategoryById(int id)
        {
            var category = _context.categories.FirstOrDefault(x => x.Id == id);
            if (category == null)
            {
                throw new InvalidOperationException($"Category with ID '{id}' not found.");
            }

            return category;
        }
    }
}
