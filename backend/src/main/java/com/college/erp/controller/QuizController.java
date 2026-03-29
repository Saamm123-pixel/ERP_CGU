package com.college.erp.controller;

import com.college.erp.model.Quiz;
import com.college.erp.repository.QuizRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizRepository repo;

    public QuizController(QuizRepository repo) { this.repo = repo; }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Quiz>> getByStatus(@PathVariable String status) {
        return ResponseEntity.ok(repo.findByStatus(status));
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Quiz quiz) {
        if (quiz.getTitle() == null || quiz.getSubject() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "title and subject are required"));
        }
        if (quiz.getStatus() == null) quiz.setStatus("Active");
        if (quiz.getQuestionsJson() == null) quiz.setQuestionsJson("[]");
        return ResponseEntity.ok(repo.save(quiz));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Object> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return repo.findById(id).map(q -> {
            q.setStatus(body.getOrDefault("status", q.getStatus()));
            return ResponseEntity.<Object>ok(repo.save(q));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", "Not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
