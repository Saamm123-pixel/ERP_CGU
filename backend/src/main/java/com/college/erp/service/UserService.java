package com.college.erp.service;

import com.college.erp.model.User;
import com.college.erp.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmail(email).map(user -> {
            // Auto-unban before password check if ban has expired
            if (user.isBanned() && user.getBanUntil() != null
                    && LocalDateTime.now().isAfter(user.getBanUntil())) {
                user.setBanned(false);
                user.setBanReason(null);
                user.setBanUntil(null);
                userRepository.save(user);
            }
            return user.getPassword().equals(password) ? user : null;
        }).orElse(null);
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User banUser(Long id, String reason, LocalDateTime banUntil) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(true);
        user.setBanReason(reason);
        user.setBanUntil(banUntil);
        return userRepository.save(user);
    }

    public User unbanUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBanned(false);
        user.setBanReason(null);
        user.setBanUntil(null);
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(Long id, Map<String, String> body) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (body.containsKey("name"))       user.setName(body.get("name"));
        if (body.containsKey("email"))      user.setEmail(body.get("email"));
        if (body.containsKey("phone"))      user.setPhone(body.get("phone"));
        if (body.containsKey("dob"))        user.setDob(body.get("dob"));
        if (body.containsKey("address"))    user.setAddress(body.get("address"));
        if (body.containsKey("department")) user.setDepartment(body.get("department"));
        if (body.containsKey("bio"))        user.setBio(body.get("bio"));
        return userRepository.save(user);
    }
}
