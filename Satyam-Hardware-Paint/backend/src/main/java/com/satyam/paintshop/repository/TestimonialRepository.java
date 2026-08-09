package com.satyam.paintshop.repository;

import com.satyam.paintshop.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByActiveTrueOrderByIdAsc();
}
