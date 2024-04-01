using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Models;

namespace TOQUE.DE.CHEF.Controllers
{
    public class SuplyerController : Controller
    {
        public List<Suplyer> listSuplyers { get; set; }

        private readonly Context _context;

        public SuplyerController(Context context)
        {
            _context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        public JsonResult getSuplyers(string search = null, int page = 1, int take = 15)
        {
            listSuplyers = _context.suppliers.ToList();
            int totalRegistros = 0;
            int skip = (page - 1) * take;


            totalRegistros = listSuplyers.Count;

            if (string.IsNullOrEmpty(search).Equals(false))
            {
                listSuplyers = listSuplyers.Where(x => x.Name.Contains(search) || x.Description.Contains(search)).ToList();
            }

            return Json(
                    new
                    {
                        obj = listSuplyers.Skip(skip).Take(take),
                        count = totalRegistros
                    }
                );
        }

        [HttpPost]
        public string createSupyer(string name, string email, string phone, string description)
        {
            try
            {
                Suplyer newSuplyer = new Suplyer();
                newSuplyer.Name = name;
                newSuplyer.Email = email;
                newSuplyer.Phone = phone;
                newSuplyer.Description = description;

                _context.suppliers.Add(newSuplyer);
                _context.SaveChanges();

                return "OK";
            }
            catch
            {
                return "ERROR";
            }
        }

        [HttpDelete]
        public string deleteSuplyer(int id)
        {
            try
            {
                _context.Remove(_context.suppliers.Single(x => x.Id == id));
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }

        [HttpGet]
        public JsonResult getSuplyerById(int id)
        {
            Suplyer suplyer = _context.suppliers.FirstOrDefault(x => x.Id == id);
            return Json(suplyer);
        }


        [HttpPut]
        public string editSuplyer(int id, string newName, string newEmail, string newPhone, string newDescription)
        {
            try
            {
                Suplyer SuplyerToEdit = _context.suppliers.FirstOrDefault(x => x.Id == id);
                SuplyerToEdit.Name = newName;
                SuplyerToEdit.Email = newEmail;
                SuplyerToEdit.Phone = newPhone;
                SuplyerToEdit.Description = newDescription;
                _context.suppliers.Update(SuplyerToEdit);
                _context.SaveChanges();
                return "OK";
            }
            catch
            {
                return "ERRO";
            }
        }
    }
}
