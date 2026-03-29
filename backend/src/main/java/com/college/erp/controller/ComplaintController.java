package com.college.erp.controller;

import com.college.erp.model.Complaint;
import com.college.erp.repository.ComplaintRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    private final ComplaintRepository repo;

    public ComplaintController(ComplaintRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/user/{submittedBy}")
    public ResponseEntity<List<Complaint>> getByUser(@PathVariable String submittedBy) {
        return ResponseEntity.ok(repo.findBySubmittedBy(submittedBy));
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Complaint complaint) {
        if (complaint.getTitle() == null || complaint.getDescription() == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "title and description are required"));
        }
        complaint.setStatus("Open");
        complaint.setSubmittedDate(LocalDate.now());
        if (complaint.getPriority() == null) complaint.setPriority("Medium");
        if (complaint.getCategory() == null) complaint.setCategory("General");
        return ResponseEntity.ok(repo.save(complaint));
    }

    @PutMapping("/{id}/respond")
    public ResponseEntity<Object> respond(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(c -> {
            c.setResponse(body.get("response"));
            c.setStatus(body.getOrDefault("status", "In Progress"));
            return ResponseEntity.<Object>ok(repo.save(c));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("success", false, "message", "Complaint not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", "Complaint not found"));
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
