package com.college.erp.controller;

import com.college.erp.model.Attendance;
import com.college.erp.repository.AttendanceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceRepository repo;

    public AttendanceController(AttendanceRepository repo) {
        this.repo = repo;
    }

    // Faculty marks attendance for a list of students
    @PostMapping("/mark")
    public ResponseEntity<?> markAttendance(@RequestBody Map<String, Object> body) {
        String subject      = (String) body.get("subject");
        String faculty      = (String) body.getOrDefault("faculty", "Faculty");
        String academicYear = (String) body.getOrDefault("academicYear", "2025-26");
        LocalDate date      = LocalDate.now();

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> students = (List<Map<String, Object>>) body.get("students");

        if (students == null || students.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "No students provided"));
        }

        List<Attendance> saved = new ArrayList<>();
        for (Map<String, Object> s : students) {
            Long   studentId   = Long.valueOf(s.get("id").toString());
            String studentName = (String) s.getOrDefault("name", "");
            String status      = Boolean.TRUE.equals(s.get("present")) ? "present" : "absent";

            // Skip if already marked today for same subject
            boolean exists = repo.findByStudentId(studentId).stream()
                .anyMatch(a -> a.getSubject().equals(subject) && a.getDate().equals(date));
            if (exists) continue;

            Attendance a = new Attendance();
            a.setStudentId(studentId);
            a.setStudentName(studentName);
            a.setSubject(subject);
            a.setFaculty(faculty);
            a.setDate(date);
            a.setStatus(status);
            a.setAcademicYear(academicYear);
            saved.add(repo.save(a));
        }
        return ResponseEntity.ok(Map.of("success", true, "marked", saved.size()));
    }

    // Student gets their attendance summary grouped by subject
    @GetMapping("/student/{studentId}")
    public ResponseEntity<?> getStudentAttendance(
            @PathVariable Long studentId,
            @RequestParam(defaultValue = "2024-25") String year) {

        List<Object[]> raw = repo.getSummary(studentId, year);
        List<Map<String, Object>> result = new ArrayList<>();
        for (Object[] row : raw) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("subject",  row[0]);
            map.put("total",    row[1]);
            map.put("attended", row[2]);
            map.put("faculty",  row[3]);
            result.add(map);
        }
        return ResponseEntity.ok(result);
    }

    // Admin / Faculty: get all raw attendance records
    @GetMapping("/all")
    public ResponseEntity<?> getAllAttendance() {
        return ResponseEntity.ok(repo.findAll());
    }

    // Get attendance by student (raw records)
    @GetMapping("/raw/{studentId}")
    public ResponseEntity<?> getRawByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(repo.findByStudentId(studentId));
    }
}
