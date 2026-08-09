package com.satyam.paintshop.controller;

import com.satyam.paintshop.dto.ApiResponse;
import com.satyam.paintshop.entity.Testimonial;
import com.satyam.paintshop.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for customer testimonials.
 * Public endpoint — no authentication required.
 */
@RestController
@RequestMapping("/testimonials")
@RequiredArgsConstructor
public class TestimonialController {

    private final TestimonialService testimonialService;

    /**
     * GET /api/testimonials
     * Returns all active testimonials.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Testimonial>>> getAllTestimonials() {
        return ResponseEntity.ok(ApiResponse.success(testimonialService.getAllActive()));
    }
}
