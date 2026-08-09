package com.satyam.paintshop.service;

import com.satyam.paintshop.entity.Product;
import com.satyam.paintshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service for product catalog operations.
 */
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    /** Returns all active products sorted by display order. */
    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    /** Returns active products filtered by category. */
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndActiveTrueOrderByDisplayOrderAsc(category);
    }

    /** Returns a single product by ID. */
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
}
