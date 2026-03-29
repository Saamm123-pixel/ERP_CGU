package com.college.erp.repository;
import com.college.erp.model.GatePass;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface GatePassRepository extends JpaRepository<GatePass, Long> {
    List<GatePass> findByStudentId(Long studentId);
}
