package ch.hearc.springmysubs.category;

import ch.hearc.springmysubs.shared.DAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {

    private final DAO<Category> categoryDAO;
    private final ICategoryMapper categoryMapper;

    @Autowired
    public CategoryService(CategoryDAO categoryDao, ICategoryMapper categoryMapper) {
        this.categoryDAO = categoryDao;
        this.categoryMapper = categoryMapper;
    }

    /**
     * Add a category
     *
     * @param category
     */
    @Override
    public void saveCategory(CategoryDTO category) {
        categoryDAO.save(categoryMapper.toEntity(category));
    }

    /**
     * Get a category by its id
     *
     * @param id
     */
    @Override
    public CategoryDTO getCategoryById(Long id) {
        return categoryDAO.get(id).map(categoryMapper::toDto).orElse(null);
    }

    /**
     * Get all categories
     */
    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryDAO.getAll().stream().map(categoryMapper::toDto).collect(Collectors.toList());
    }

    /**
     * Update a category
     *
     * @param category
     */
    @Override
    public void updateCategory(CategoryDTO category) {
        categoryDAO.update(categoryMapper.toEntity(category));
    }

    /**
     * Delete a category
     *
     * @param category
     */
    @Override
    public void deleteCategory(CategoryDTO category) {
        categoryDAO.delete(categoryMapper.toEntity(category));
    }


}
