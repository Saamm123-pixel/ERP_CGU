package com.college.erp.controller;

import com.college.erp.model.Notice;
import com.college.erp.repository.NoticeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notices")
@CrossOrigin(origins = "*")
public class NoticeController {

    private final NoticeRepository repo;

    public NoticeController(NoticeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Notice>> getAll() {
        return ResponseEntity.ok(repo.findAllByOrderByPostedDateDesc());
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<Notice>> getByRole(@PathVariable String role) {
        return ResponseEntity.ok(repo.findByTargetRolesContainingOrTargetRolesOrderByPostedDateDesc(role, "all"));
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Notice notice) {
        if (notice.getTitle() == null || notice.getDescription() == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "title and description are required"));
        }
        if (notice.getPostedDate() == null) notice.setPostedDate(LocalDate.now());
        if (notice.getTargetRoles() == null) notice.setTargetRoles("all");
        return ResponseEntity.ok(repo.save(notice));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", "Notice not found"));
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
