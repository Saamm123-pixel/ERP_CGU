package com.college.erp.controller;

import com.college.erp.model.Grade;
import com.college.erp.repository.GradeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "*")
public class GradeController {

    private final GradeRepository repo;

    public GradeController(GradeRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(repo.findByStudentId(studentId));
    }

    @GetMapping("/student/{studentId}/semester/{semester}")
    public ResponseEntity<List<Grade>> getBySemester(@PathVariable Long studentId, @PathVariable int semester) {
        return ResponseEntity.ok(repo.findByStudentIdAndSemester(studentId, semester));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Grade>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> create(@RequestBody Grade grade) {
        if (grade.getStudentId() == null || grade.getSubject() == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "studentId and subject are required"));
        }
        grade.setTotalMarks(grade.getMidMarks() + grade.getEndMarks());
        return ResponseEntity.ok(repo.save(grade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody Grade updated) {
        return repo.findById(id).map(g -> {
            g.setMidMarks(updated.getMidMarks());
            g.setEndMarks(updated.getEndMarks());
            g.setTotalMarks(updated.getMidMarks() + updated.getEndMarks());
            g.setGrade(updated.getGrade());
            g.setGradePoints(updated.getGradePoints());
            return ResponseEntity.<Object>ok(repo.save(g));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("success", false, "message", "Grade not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", "Grade not found"));
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
