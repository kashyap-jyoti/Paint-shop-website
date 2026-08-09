package com.satyam.paintshop.service;

import com.satyam.paintshop.dto.ContactMessageDTO;
import com.satyam.paintshop.entity.ContactMessage;
import com.satyam.paintshop.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for handling contact form submissions.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    /**
     * Saves a contact form submission to the database.
     *
     * @param dto validated contact form data
     * @return saved ContactMessage entity
     */
    @Transactional
    public ContactMessage saveMessage(ContactMessageDTO dto) {
        ContactMessage message = ContactMessage.builder()
                .name(dto.getName().trim())
                .phone(dto.getPhone().trim())
                .email(dto.getEmail() != null ? dto.getEmail().trim() : null)
                .message(dto.getMessage().trim())
                .build();

        ContactMessage saved = contactMessageRepository.save(message);
        log.info("New contact message saved from: {} ({})", saved.getName(), saved.getPhone());
        return saved;
    }
}
