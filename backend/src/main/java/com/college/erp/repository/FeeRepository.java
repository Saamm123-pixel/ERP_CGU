package com.college.erp.repository;
import com.college.erp.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudentId(Long studentId);
}
