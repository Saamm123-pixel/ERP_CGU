package com.college.erp.controller;

import com.college.erp.model.Registration;
import com.college.erp.repository.RegistrationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "*")
public class RegistrationController {

    private final RegistrationRepository repo;

    public RegistrationController(RegistrationRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<List<Registration>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Registration>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(repo.findByStudentId(studentId));
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Registration reg) {
        if (reg.getStudentId() == null || reg.getType() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "studentId and type are required"));
        }
        reg.setStatus("Pending");
        reg.setSubmittedOn(LocalDate.now());
        if (reg.getRemarks() == null) reg.setRemarks("Under review.");
        return ResponseEntity.ok(repo.save(reg));
    }

    @PutMapping("/{id}/action")
    public ResponseEntity<Object> action(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(r -> {
            String act = body.getOrDefault("action", "approve");
            r.setStatus(act.equals("approve") ? "Approved" : "Rejected");
            if (body.containsKey("remarks")) r.setRemarks(body.get("remarks"));
            return ResponseEntity.<Object>ok(repo.save(r));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
