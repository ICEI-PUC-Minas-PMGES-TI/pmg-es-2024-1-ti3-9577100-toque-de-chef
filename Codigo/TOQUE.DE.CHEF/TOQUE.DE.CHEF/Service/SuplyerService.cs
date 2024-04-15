using Microsoft.EntityFrameworkCore;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Services
{
    public class SuplyerService
    {
        private readonly Context _context;

        public SuplyerService(Context context)
        {
            _context = context;
        }

        public ApiResponse<Suplyer> GetAllSuplyers(string search = null, int page = 1, int take = 15)
        {
            var query = _context.suplyers
                .Include(p => p.Purchases)
                .Where(p => p.DeletedAt == null)
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => x.Name.Contains(search) || x.Description.Contains(search));
            }

            int totalRecords = query.Count();
            List<Suplyer> suplyers = query.Skip((page - 1) * take).Take(take).ToList();

            return new ApiResponse<Suplyer>
            {
                Count = totalRecords,
                obj = suplyers
            };
        }

        public Suplyer GetSuplyerById(int id)
        {
            var suplyer = _context.suplyers.FirstOrDefault(s => s.Id == id);

            if (suplyer == null)
            {
                throw new InvalidOperationException($"Fornecedor com ID '{id}' não encontrado.");
            }

            return suplyer;
        }

        public Suplyer CreateSuplyer(SuplyerDto dto)
        {
            var suplyer = new Suplyer
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                Description = dto.Description
            };

            _context.suplyers.Add(suplyer);
            _context.SaveChanges();

            return suplyer;
        }

        public void DeleteSuplyer(int id)
        {
            var suplyer = _context.suplyers.FirstOrDefault(s => s.Id == id);

            if (suplyer == null)
            {
                throw new InvalidOperationException($"Fornecedor com ID '{id}' não encontrado.");
            }

            suplyer.DeletedAt = DateTime.UtcNow;

            _context.SaveChanges();
        }


        public Suplyer EditSuplyer(int id, SuplyerDto dto)
        {
            var suplyer = _context.suplyers.FirstOrDefault(s => s.Id == id);

            if (suplyer == null)
            {
                throw new InvalidOperationException($"Fornecedor com ID '{id}' não encontrado.");
            }

            suplyer.Name = dto.Name;
            suplyer.Email = dto.Email;
            suplyer.Phone = dto.Phone;
            suplyer.Description = dto.Description;

            _context.SaveChanges();

            return suplyer;
        }
    }
}
