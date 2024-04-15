using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Services;

namespace TOQUE.DE.CHEF.Controllers
{
    public class PurchaseController : Controller
    {
        private readonly PurchaseService _purchaseService;

        public PurchaseController(PurchaseService purchaseService)
        {
            _purchaseService = purchaseService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CreatePurchase([FromBody] PurchaseDto dto)
        {
            try
            {
                var purchase = _purchaseService.CreatePurchase(dto);
                return Ok(purchase);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAllPurchases(string search = null, int page = 1, int take = 15)
        {
            try
            {
                var purchases = _purchaseService.GetAllPurchases(search, page, take);
                return Ok(purchases);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("Purchase/editPurchase/{id}")]
        public IActionResult EditPurchase(int id, [FromBody] PurchaseDto dto)
        {
            try
            {
                var purchase = _purchaseService.EditPurchase(id, dto);
                return Ok(purchase);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
