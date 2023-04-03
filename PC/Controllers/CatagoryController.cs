using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsCategories.Models;

namespace ProductsCategories.Controllers;

public class categoryController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private MyContext _context;

    public categoryController(ILogger<HomeController> logger, MyContext context)
    {
        _logger = logger;
        _context = context;
    }


    // -------------------Create------------------------------------
 


[HttpPost("/Category/Create")]
public IActionResult CategoryCreate(Category category)
{
    MyViewModel viewModel = new MyViewModel();
    if (!ModelState.IsValid)
    {
        Console.WriteLine("Model is not valid:");

        return View("AllCategories");
    }

    _context.Categories.Add(category);
    _context.SaveChanges();
    return RedirectToAction("Category");
}

    // ----------------------end -----------------------------------------


 // ---------------------view all----------------------------------

    [HttpGet("/Categories")]
    public IActionResult Category()
  {
    List<Category> AllCategories = _context.Categories.ToList();
    MyViewModel viewModel = new MyViewModel()
    {
        AllCategories = AllCategories
    };
    return View("AllCategories", viewModel);
}

  // ----------------------end -----------------------------------------


    // ---------------------view one----------------------------------
[HttpGet("/Category/View/{id}")]
public IActionResult CategoryView(int id)
{
    // Get the category and its associated products
    Category category = _context.Categories
        .Include(c => c.AllProducts)
        .ThenInclude(c => c.Product)
        .SingleOrDefault(c => c.CategoryId == id);

    if (category == null)
    {
        return NotFound();
    }

    MyViewModel viewModel = new MyViewModel
    {
        Category = category,
        AllProducts = category.AllProducts.Select(c => c.Product).ToList()
    };

    // Get the products that are not associated with the category
    var availableProducts = _context.Products
        .AsEnumerable()
        .Where(p => !category.AllProducts.Any(cp => cp.ProductId == p.ProductId))
        .ToList();

    ViewBag.AvailableProducts = availableProducts;

    return View("ViewCategory", viewModel);
}
    // add join
[HttpPost("/Category/AddProduct/{categoryId}")]
public IActionResult AddProduct(int categoryId, int productId)
{
    var category = _context.Categories.Include(c => c.AllProducts).SingleOrDefault(c => c.CategoryId == categoryId);
    var product = _context.Products.Find(productId);

    if (category == null || product == null)
    {
        return NotFound();
    }

    category.AllProducts.Add(new ProductCategory { Category = category, Product = product });
    _context.SaveChanges();

    return RedirectToAction("CategoryView", new { id = categoryId });
}

    // --------------------------end--------------------------
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
