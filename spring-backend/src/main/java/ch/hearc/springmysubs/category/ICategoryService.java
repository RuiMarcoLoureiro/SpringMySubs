package ch.hearc.springmysubs.category;

import java.util.List;

public interface ICategoryService {
    public void saveCategory(CategoryDTO category);
    public CategoryDTO getCategoryById(Long id);
    public List<CategoryDTO> getAllCategories();
    public void updateCategory(CategoryDTO category);
    public void deleteCategory(CategoryDTO category);
}
