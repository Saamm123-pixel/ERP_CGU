package com.college.erp.repository;
import com.college.erp.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    List<Notice> findAllByOrderByPostedDateDesc();
    List<Notice> findByTargetRolesContainingOrTargetRolesOrderByPostedDateDesc(String role, String all);
}
