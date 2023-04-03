#pragma warning disable CS8618
using System.ComponentModel.DataAnnotations;
namespace ProductsCategories.Models;

public class ProductCategory
{

    [Key]
    public int ProductCatagoryId { get; set; }
    
    public int ProductId { get; set; }
    public int CategoryId { get; set; }

    public Product? Product { get; set; }
    public Category? Category { get; set; }


    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

}
