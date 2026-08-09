package com.satyam.paintshop.controller;

import com.satyam.paintshop.dto.ApiResponse;
import com.satyam.paintshop.dto.ContactMessageDTO;
import com.satyam.paintshop.entity.ContactMessage;
import com.satyam.paintshop.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for contact form submissions.
 * Public endpoint — no authentication required.
 */
@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    /**
     * POST /api/contact
     * Accepts a contact form submission and saves it to the database.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitContact(
            @Valid @RequestBody ContactMessageDTO dto) {

        contactService.saveMessage(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(null, "Thank you! We'll contact you shortly."));
    }
}
