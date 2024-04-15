using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Services;

namespace TOQUE.DE.CHEF.Controllers
{
    public class suplyerController : Controller
    {
        private readonly SuplyerService _suplyerService;

        public suplyerController(SuplyerService SuplyerService)
        {
            _suplyerService = SuplyerService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllSuplyers(string search = null, int page = 1, int take = 15)
        {
            try
            {
                var suplyers = _suplyerService.GetAllSuplyers(search, page, take);
                return Ok(suplyers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateSuplyer([FromBody] SuplyerDto dto)
        {
            try
            {
                var suplyer = _suplyerService.CreateSuplyer(dto);
                return Ok(suplyer);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("suplyer/deleteSuplyer/{id}")]
        public IActionResult DeleteSuplyer(int id)
        {
            try
            {
                _suplyerService.DeleteSuplyer(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("suplyer/editSuplyer/{id}")]
        public IActionResult EditSuplyer(int id, [FromBody] SuplyerDto dto)
        {
            try
            {
                var suplyer = _suplyerService.EditSuplyer(id, dto);
                return Ok(suplyer);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetSuplyerById(int id)
        {
            try
            {
                var suplyer = _suplyerService.GetSuplyerById(id);
                return Ok(suplyer);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
