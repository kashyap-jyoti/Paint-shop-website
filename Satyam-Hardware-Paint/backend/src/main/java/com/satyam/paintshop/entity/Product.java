package com.satyam.paintshop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Product entity for the paint/hardware catalog.
 */
@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "price_range", length = 50)
    private String priceRange;

    @Column(length = 10)
    private String icon;

    @Column(length = 100)
    private String gradient;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_features", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "feature")
    private List<String> features;

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;

    @Column(name = "display_order")
    private Integer displayOrder;
}
