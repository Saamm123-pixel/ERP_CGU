package com.college.erp.repository;
import com.college.erp.model.Placement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PlacementRepository extends JpaRepository<Placement, Long> {
    List<Placement> findByStatus(String status);
    List<Placement> findByType(String type);
}
