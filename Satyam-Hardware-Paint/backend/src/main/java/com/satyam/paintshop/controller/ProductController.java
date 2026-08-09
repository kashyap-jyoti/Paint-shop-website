package com.satyam.paintshop.controller;

import com.satyam.paintshop.dto.ApiResponse;
import com.satyam.paintshop.entity.Product;
import com.satyam.paintshop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for product catalog.
 * Public endpoint — no authentication required.
 */
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products
     * Returns all active products, optionally filtered by category.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(
            @RequestParam(required = false) String category) {

        List<Product> products = (category != null && !category.isBlank())
                ? productService.getProductsByCategory(category)
                : productService.getAllActiveProducts();

        return ResponseEntity.ok(ApiResponse.success(products));
    }

    /**
     * GET /api/products/{id}
     * Returns a single product by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.success(p)))
                .orElse(ResponseEntity.notFound().build());
    }
}
