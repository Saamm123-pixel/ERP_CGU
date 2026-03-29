package com.college.erp.controller;

import com.college.erp.model.Club;
import com.college.erp.model.ClubEvent;
import com.college.erp.repository.ClubRepository;
import com.college.erp.repository.ClubEventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "*")
public class ClubController {

    private final ClubRepository clubRepo;
    private final ClubEventRepository eventRepo;

    public ClubController(ClubRepository clubRepo, ClubEventRepository eventRepo) {
        this.clubRepo = clubRepo;
        this.eventRepo = eventRepo;
    }

    @GetMapping
    public ResponseEntity<List<Club>> getAllClubs() {
        return ResponseEntity.ok(clubRepo.findAll());
    }

    @PostMapping
    public ResponseEntity<Object> createClub(@RequestBody Club club) {
        if (club.getName() == null) return ResponseEntity.badRequest().body(Map.of("success", false, "message", "name required"));
        return ResponseEntity.ok(clubRepo.save(club));
    }

    @PutMapping("/{id}/members")
    public ResponseEntity<Object> updateMembers(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return clubRepo.findById(id).map(c -> {
            c.setMembers(body.getOrDefault("members", c.getMembers()));
            return ResponseEntity.<Object>ok(clubRepo.save(c));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteClub(@PathVariable Long id) {
        if (!clubRepo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        clubRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    // Events
    @GetMapping("/events")
    public ResponseEntity<List<ClubEvent>> getAllEvents() {
        return ResponseEntity.ok(eventRepo.findAll());
    }

    @PostMapping("/events")
    public ResponseEntity<Object> createEvent(@RequestBody ClubEvent event) {
        if (event.getTitle() == null) return ResponseEntity.badRequest().body(Map.of("success", false, "message", "title required"));
        return ResponseEntity.ok(eventRepo.save(event));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Object> deleteEvent(@PathVariable Long id) {
        if (!eventRepo.existsById(id)) return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false));
        eventRepo.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true));
    }
}
