package com.satyam.paintshop.config;

import com.satyam.paintshop.entity.Product;
import com.satyam.paintshop.entity.Testimonial;
import com.satyam.paintshop.repository.ProductRepository;
import com.satyam.paintshop.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Seeds initial data into the database on first startup.
 * Only inserts if tables are empty (idempotent).
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final ProductRepository productRepository;
    private final TestimonialRepository testimonialRepository;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            seedProducts();
            seedTestimonials();
        };
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            log.info("Products already seeded, skipping.");
            return;
        }

        List<Product> products = List.of(
            Product.builder().name("Interior Emulsion Paint").category("Interior")
                .description("Smooth, washable finish for interior walls. Excellent coverage with vibrant colors.")
                .priceRange("₹250 – ₹800/L").icon("🏠").gradient("from-orange-400 to-red-500")
                .features(List.of("Washable", "Low VOC", "3000+ Shades", "5 Year Warranty"))
                .displayOrder(1).build(),

            Product.builder().name("Exterior Weather Shield").category("Exterior")
                .description("Advanced protection against rain, UV, and extreme weather conditions.")
                .priceRange("₹300 – ₹900/L").icon("🌧️").gradient("from-blue-400 to-indigo-600")
                .features(List.of("Weatherproof", "UV Resistant", "Anti-fungal", "7 Year Warranty"))
                .displayOrder(2).build(),

            Product.builder().name("Wall Putty").category("Putty")
                .description("White cement-based putty for smooth wall finish before painting.")
                .priceRange("₹15 – ₹25/kg").icon("🧱").gradient("from-stone-400 to-gray-600")
                .features(List.of("Smooth Finish", "Strong Adhesion", "Water Resistant", "Easy Application"))
                .displayOrder(3).build(),

            Product.builder().name("Premium Primer").category("Primer")
                .description("Superior adhesion primer for better paint coverage and durability.")
                .priceRange("₹180 – ₹450/L").icon("🪣").gradient("from-yellow-400 to-orange-500")
                .features(List.of("Better Adhesion", "Stain Block", "Quick Dry", "All Surfaces"))
                .displayOrder(4).build(),

            Product.builder().name("Waterproof Coating").category("Waterproof")
                .description("Elastomeric waterproof coating for roofs, terraces, and wet areas.")
                .priceRange("₹350 – ₹1200/L").icon("💧").gradient("from-cyan-400 to-blue-600")
                .features(List.of("100% Waterproof", "Crack Bridge", "Heat Resistant", "Long Lasting"))
                .displayOrder(5).build(),

            Product.builder().name("Paint Brushes").category("Tools")
                .description("Professional-grade brushes for smooth, streak-free paint application.")
                .priceRange("₹20 – ₹350/piece").icon("🖌️").gradient("from-purple-400 to-pink-500")
                .features(List.of("Natural Bristles", "Ergonomic Handle", "Multiple Sizes", "All Paint Types"))
                .displayOrder(6).build(),

            Product.builder().name("Paint Rollers").category("Tools")
                .description("High-capacity rollers for fast, even coverage on large wall surfaces.")
                .priceRange("₹80 – ₹600/set").icon("🎨").gradient("from-green-400 to-teal-600")
                .features(List.of("Even Coverage", "Lint Free", "Various Nap", "Rust-proof Handle"))
                .displayOrder(7).build(),

            Product.builder().name("Construction Hardware").category("Hardware")
                .description("Screws, bolts, hinges, nails, and complete construction hardware supplies.")
                .priceRange("₹10 – ₹5000/set").icon("🔧").gradient("from-slate-500 to-zinc-700")
                .features(List.of("Stainless Steel", "Rust Resistant", "All Sizes", "Bulk Available"))
                .displayOrder(8).build(),

            Product.builder().name("Enamel & Texture Paint").category("Special")
                .description("Glossy enamel for wood & metal, plus designer texture finishes.")
                .priceRange("₹200 – ₹750/L").icon("✨").gradient("from-pink-400 to-rose-600")
                .features(List.of("High Gloss", "Hard Wearing", "Texture Effects", "1000+ Designs"))
                .displayOrder(9).build()
        );

        productRepository.saveAll(products);
        log.info("Seeded {} products successfully.", products.size());
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() > 0) {
            log.info("Testimonials already seeded, skipping.");
            return;
        }

        List<Testimonial> testimonials = List.of(
            Testimonial.builder().name("Rajesh Kumar").role("Contractor").avatar("R").rating(5)
                .content("Best paint shop in Ghazipur! Always have the right products and the staff is very knowledgeable. My go-to place for all construction projects.").build(),

            Testimonial.builder().name("Priya Sharma").role("Homeowner").avatar("P").rating(5)
                .content("Got excellent color consultation for my new home. The team helped me choose perfect shades for every room. Highly recommend!").build(),

            Testimonial.builder().name("Mohan Singh").role("Interior Designer").avatar("M").rating(5)
                .content("Reliable supplier with genuine products and competitive prices. The bulk order service is excellent for big projects.").build(),

            Testimonial.builder().name("Anita Verma").role("Architect").avatar("A").rating(5)
                .content("Satyam Hardware is my trusted partner. They stock everything from premium paints to quality tools. Outstanding service!").build(),

            Testimonial.builder().name("Suresh Yadav").role("Builder").avatar("S").rating(5)
                .content("Great variety of products and fair pricing. The delivery service is quick and packaging is always intact. Very professional.").build()
        );

        testimonialRepository.saveAll(testimonials);
        log.info("Seeded {} testimonials successfully.", testimonials.size());
    }
}
