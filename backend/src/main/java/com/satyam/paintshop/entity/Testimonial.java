package com.satyam.paintshop.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Customer testimonial entity.
 */
@Entity
@Table(name = "testimonials")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String name;

    @Column(length = 60)
    private String role;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    @Builder.Default
    private int rating = 5;

    @Column(length = 5)
    private String avatar;

    @Column(name = "is_active")
    @Builder.Default
    private boolean active = true;
}
