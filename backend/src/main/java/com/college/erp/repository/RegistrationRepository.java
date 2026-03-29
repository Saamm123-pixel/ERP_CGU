package com.college.erp.repository;
import com.college.erp.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByStudentId(Long studentId);
}
