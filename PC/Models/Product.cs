#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace ProductsCategories.Models;

public class Product
{

    [Key]

    public int ProductId { get; set; }

    [Required(ErrorMessage = "Product name is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Product description is required.")]
    public string Description { get; set; }

    [Required(ErrorMessage = "Product price is required.")]
    public decimal Price { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public List<ProductCategory> AllCategories { get; set; } = new List<ProductCategory>();
}
