package com.college.erp.controller;

import com.college.erp.model.Placement;
import com.college.erp.repository.PlacementRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/placements")
@CrossOrigin(origins = "*")
public class PlacementController {

    private final PlacementRepository repo;

    public PlacementController(PlacementRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<List<Placement>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Placement p) {
        if (p.getCompanyName() == null || p.getRole() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "companyName and role are required"));
        }
        if (p.getStatus() == null) p.setStatus("Open");
        return ResponseEntity.ok(repo.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Placement updated) {
        return repo.findById(id).map(p -> {
            p.setStatus(updated.getStatus() != null ? updated.getStatus() : p.getStatus());
            p.setDeadline(updated.getDeadline() != null ? updated.getDeadline() : p.getDeadline());
            return ResponseEntity.<Object>ok(repo.save(p));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
