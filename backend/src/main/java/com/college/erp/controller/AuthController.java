package com.college.erp.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.college.erp.model.User;
import com.college.erp.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        try {
            User saved = userService.register(user);
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                "id", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail(),
                "role", saved.getRole()
            ));
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        String email = body.get("email");
        String password = body.get("password");

        User user = userService.login(email, password);
        if (user == null) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        if (user.isBanned()) {
            response.put("success", false);
            response.put("banned", true);
            response.put("banReason", user.getBanReason());
            response.put("banUntil", user.getBanUntil() != null ? user.getBanUntil().toString() : null);
            response.put("message", "Your account has been temporarily banned.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        response.put("success", true);
        response.put("message", "Login successful");
        response.put("user", Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "role", user.getRole()
        ));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        return ResponseEntity.ok(userService.getUsersByRole(role));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.deleteUser(id);
            response.put("success", true);
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PostMapping("/users/{id}/ban")
    public ResponseEntity<Map<String, Object>> banUser(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            String reason = body.get("reason");
            int days = Integer.parseInt(body.getOrDefault("days", "1"));
            LocalDateTime banUntil = LocalDateTime.now().plusDays(days);
            userService.banUser(id, reason, banUntil);
            response.put("success", true);
            response.put("message", "User banned until " + banUntil);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/users/{id}/unban")
    public ResponseEntity<Map<String, Object>> unbanUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            userService.unbanUser(id);
            response.put("success", true);
            response.put("message", "User unbanned successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PutMapping("/users/{id}/profile")
    public ResponseEntity<Map<String, Object>> updateProfile(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Map<String, Object> response = new HashMap<>();
        try {
            User updated = userService.updateProfile(id, body);
            response.put("success", true);
            response.put("message", "Profile updated successfully");
            response.put("user", Map.of(
                "id",         updated.getId(),
                "name",       updated.getName(),
                "email",      updated.getEmail(),
                "role",       updated.getRole(),
                "phone",      updated.getPhone()      != null ? updated.getPhone()      : "",
                "dob",        updated.getDob()         != null ? updated.getDob()         : "",
                "address",    updated.getAddress()     != null ? updated.getAddress()     : "",
                "department", updated.getDepartment()  != null ? updated.getDepartment()  : "",
                "bio",        updated.getBio()         != null ? updated.getBio()         : ""
            ));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> getUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            User u = userService.getUserById(id);
            response.put("success", true);
            response.put("user", Map.of(
                "id",         u.getId(),
                "name",       u.getName(),
                "email",      u.getEmail(),
                "role",       u.getRole(),
                "phone",      u.getPhone()      != null ? u.getPhone()      : "",
                "dob",        u.getDob()         != null ? u.getDob()         : "",
                "address",    u.getAddress()     != null ? u.getAddress()     : "",
                "department", u.getDepartment()  != null ? u.getDepartment()  : "",
                "bio",        u.getBio()         != null ? u.getBio()         : ""
            ));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
