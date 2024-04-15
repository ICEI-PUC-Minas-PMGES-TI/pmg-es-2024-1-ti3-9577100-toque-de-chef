using Microsoft.AspNetCore.Mvc;
using System;
using TOQUE.DE.CHEF.Dto;
using TOQUE.DE.CHEF.Services;

namespace TOQUE.DE.CHEF.Controllers
{
    public class CategoryController : Controller
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllCategories(string search = null, int page = 1, int take = 15)
        {
            try
            {
                var categories = _categoryService.GetAllCategories(search, page, take);
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateCategory([FromBody] CategoryDto dto)
        {
            try
            {
                var category = _categoryService.CreateCategory(dto);
                return Ok(category);
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteCategory(int id)
        {
            try
            {
                _categoryService.DeleteCategory(id);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult EditCategory(int id, [FromBody] CategoryDto dto)
        {
            try
            {
                var category = _categoryService.EditCategory(id, dto);
                return Ok(category);
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetCategoryById(int id)
        {
            try
            {
                var category = _categoryService.GetCategoryById(id);
                return Ok(category);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
