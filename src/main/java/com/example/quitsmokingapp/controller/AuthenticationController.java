package com.example.quitsmokingapp.controller;

import com.example.quitsmokingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password, Model model) {
        if (username == null || username.trim().isEmpty()) {
            model.addAttribute("error", "Username cannot be empty.");
            return "register";
        }
        // Add server-side check for username length
        if (username.trim().length() < 3) {
            model.addAttribute("error", "Username must be at least 3 characters long.");
            return "register";
        }
        if (password == null || password.isEmpty()) {
            model.addAttribute("error", "Password cannot be empty.");
            return "register";
        }
        if (password.length() < 6) {
            model.addAttribute("error", "Password must be at least 6 characters long.");
            return "register";
        }
        
        try {
            userService.register(username, password);
            // Redirect with a parameter to indicate successful registration
            return "redirect:/login?registered";
        } catch (UserService.UsernameAlreadyExistsException e) {
            // Provide a more user-friendly message for existing username
            model.addAttribute("error", "Username already exists. Please choose a different one.");
            return "register";
        } catch (Exception e) {
            // Log the exception server-side for debugging
            // logger.error("Unexpected error during registration", e); // Assuming a logger is available
            model.addAttribute("error", "An unexpected error occurred during registration. Please try again.");
            return "register";
        }
    }

    @GetMapping("/login")
    public String login(Model model, 
                        @RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "logout", required = false) String logout,
                        @RequestParam(value = "registered", required = false) String registered,
                        @RequestParam(value = "sessionExpired", required = false) String sessionExpired) {
        if (error != null) {
            model.addAttribute("error", "Invalid username or password. Please try again.");
        }
        if (logout != null) {
            model.addAttribute("message", "You have been successfully logged out.");
        }
        if (registered != null) {
            model.addAttribute("message", "Registration successful! You can now log in.");
        }
        if (sessionExpired != null) {
            model.addAttribute("error", "Your session has expired. Please log in again.");
        }
        return "login";
    }
}