using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsCategories.Models;

namespace ProductsCategories.Controllers;

public class ProductController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private MyContext _context;

    public ProductController(ILogger<HomeController> logger, MyContext context)
    {
        _logger = logger;
        _context = context;
    }


    // -------------------Create------------------------------------

    [HttpPost("/Product/Create")]
    public IActionResult ProductCreate(Product product)
    {
        MyViewModel viewModel = new MyViewModel();
        if (!ModelState.IsValid)
        {
            Console.WriteLine("Model is not valid:");

            return View("/");
        }

        _context.Products.Add(product);
        _context.SaveChanges();
        return RedirectToAction("Index", "Home");
    }
    // ----------------------end -----------------------------------------


    // ---------------------view one----------------------------------
[HttpGet("/Product/View/{id}")]
public IActionResult ProductView(int id)
{
    // Get the product and its associated categories
    Product product = _context.Products
        .Include(p => p.AllCategories)
        .ThenInclude(p => p.Category)
        .SingleOrDefault(p => p.ProductId == id);

    if (product == null)
    {
        return NotFound();
    }

    MyViewModel viewModel = new MyViewModel
    {
        Product = product,
        AllCategories = product.AllCategories.Select(p => p.Category).ToList()
    };

    // Get the categories that are not associated with the product
var availableCategories = _context.Categories
    .AsEnumerable()
    .Where(c => !product.AllCategories.Any(pc => pc.CategoryId == c.CategoryId))
    .ToList();

    ViewBag.AvailableCategories = availableCategories;

    return View("ViewProduct", viewModel);
}


    // add join
 [HttpPost("/Product/AddCategory/{productId}")]
        public IActionResult AddCategory(int productId, int categoryId)
        {
            var product = _context.Products.Include(p => p.AllCategories).SingleOrDefault(p => p.ProductId == productId);
            var category = _context.Categories.Find(categoryId);

            if (product == null || category == null)
            {
                return NotFound();
            }

            product.AllCategories.Add(new ProductCategory { Product = product, Category = category });
            _context.SaveChanges();

            return RedirectToAction("ProductView", new { id = productId });
        }


    // --------------------------end--------------------------

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
