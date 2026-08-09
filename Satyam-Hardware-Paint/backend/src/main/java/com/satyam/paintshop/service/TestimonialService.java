package com.satyam.paintshop.service;

import com.satyam.paintshop.entity.Testimonial;
import com.satyam.paintshop.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for fetching customer testimonials.
 */
@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    /** Returns all active testimonials in insertion order. */
    public List<Testimonial> getAllActive() {
        return testimonialRepository.findByActiveTrueOrderByIdAsc();
    }
}
