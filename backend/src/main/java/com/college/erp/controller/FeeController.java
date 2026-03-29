package com.college.erp.controller;

import com.college.erp.model.Fee;
import com.college.erp.repository.FeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    private final FeeRepository repo;

    public FeeController(FeeRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Object> getStudentFees(@PathVariable Long studentId) {
        return ResponseEntity.ok(repo.findByStudentId(studentId));
    }

    @GetMapping("/all")
    public ResponseEntity<Object> getAllFees() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> createFee(@RequestBody Fee fee) {
        if (fee.getStudentId() == null || fee.getSemester() == null) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "studentId and semester are required"));
        }
        double due = fee.getTotalAmount() - fee.getPaidAmount();
        fee.setDueAmount(Math.max(due, 0));
        fee.setStatus(due <= 0 ? "Paid" : fee.getPaidAmount() > 0 ? "Partial" : "Pending");
        if (fee.getAcademicYear() == null) fee.setAcademicYear("2025-26");
        return ResponseEntity.ok(repo.save(fee));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Object> payFee(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return repo.findById(id).map(fee -> {
            double amount;
            try {
                amount = Double.parseDouble(body.get("amount").toString());
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest()
                    .<Object>body(Map.of("success", false, "message", "Invalid amount"));
            }
            if (amount <= 0) {
                return ResponseEntity.badRequest()
                    .<Object>body(Map.of("success", false, "message", "Amount must be greater than 0"));
            }
            String method  = (String) body.getOrDefault("method", "UPI");
            double newPaid = Math.min(fee.getPaidAmount() + amount, fee.getTotalAmount());
            fee.setPaidAmount(newPaid);
            fee.setDueAmount(fee.getTotalAmount() - newPaid);
            fee.setPaymentMethod(method);
            fee.setPaidDate(LocalDate.now().toString());
            fee.setStatus(fee.getDueAmount() <= 0 ? "Paid" : "Partial");
            return ResponseEntity.<Object>ok(repo.save(fee));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(Map.of("success", false, "message", "Fee record not found")));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteFee(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", "Fee record not found"));
        }
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Fee record deleted"));
    }
}
