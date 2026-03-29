package com.college.erp.controller;

import com.college.erp.model.GatePass;
import com.college.erp.repository.GatePassRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/gatepasses")
@CrossOrigin(origins = "*")
public class GatePassController {

    private final GatePassRepository repo;

    public GatePassController(GatePassRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<GatePass>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<GatePass>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(repo.findByStudentId(studentId));
    }

    @PostMapping
    public ResponseEntity<Object> apply(@RequestBody GatePass gatePass) {
        if (gatePass.getStudentId() == null || gatePass.getReason() == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "studentId and reason are required"));
        }
        gatePass.setStatus("Pending");
        gatePass.setAppliedOn(LocalDate.now());
        return ResponseEntity.ok(repo.save(gatePass));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<Object> approve(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(gp -> {
            gp.setStatus("Approved");
            gp.setApprovedBy(body.getOrDefault("approvedBy", "Admin"));
            return ResponseEntity.<Object>ok(repo.save(gp));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("success", false, "message", "Gate pass not found")));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<Object> reject(@PathVariable Long id) {
        return repo.findById(id).map(gp -> {
            gp.setStatus("Rejected");
            return ResponseEntity.<Object>ok(repo.save(gp));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("success", false, "message", "Gate pass not found")));
    }
}
