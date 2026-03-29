package com.college.erp.repository;
import com.college.erp.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    @Query("SELECT a.subject, COUNT(a), SUM(CASE WHEN LOWER(a.status)='present' THEN 1 ELSE 0 END), a.faculty FROM Attendance a WHERE a.studentId=:sid AND a.academicYear=:year GROUP BY a.subject, a.faculty")
    List<Object[]> getSummary(@Param("sid") Long studentId, @Param("year") String year);
}
