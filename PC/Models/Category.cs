#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace ProductsCategories.Models;

public class Category
{

    [Key]

    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Category name is required.")]
    public string Name { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;



    public List<ProductCategory> AllProducts  { get; set; } = new List<ProductCategory>();


}
