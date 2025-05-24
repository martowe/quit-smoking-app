package com.example.quitsmokingapp.controller;

import com.example.quitsmokingapp.config.MilestoneConstants;
import com.example.quitsmokingapp.model.Milestone;
import com.example.quitsmokingapp.model.QuitPlan;
import com.example.quitsmokingapp.service.QuitPlanService;
import com.example.quitsmokingapp.util.SmokingCalculatorUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Controller
public class QuitPlanController {

    @Autowired
    private QuitPlanService quitPlanService;

    @GetMapping("/quit-plan")
    public String quitPlan(Model model) {
        QuitPlan quitPlan = quitPlanService.getCurrentUserQuitPlan();
        model.addAttribute("quitPlan", quitPlan);
        if (quitPlan != null) {
            model.addAttribute("moneySaved", quitPlanService.calculateMoneySaved(quitPlan));
            model.addAttribute("moneyGoal", quitPlan.getMoneyGoal());
            model.addAttribute("goalReached", quitPlan.hasReachedMoneyGoal());
        } else {
            model.addAttribute("noQuitPlan", true);
        }
        return "quit-plan";
    }    @PostMapping("/save-quit-plan")
    public String saveQuitPlan(@RequestParam String quitDateTime,
                               @RequestParam int cigarettesPerDay,
                               @RequestParam double pricePerPack,
                               @RequestParam double moneyGoal,
                               Model model) {
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
            LocalDateTime parsedDateTime = LocalDateTime.parse(quitDateTime, formatter);
            quitPlanService.saveQuitPlan(parsedDateTime, cigarettesPerDay, pricePerPack, moneyGoal);
            return "redirect:/quit-plan";
        } catch (DateTimeParseException e) {
            model.addAttribute("error", "Invalid date/time format. Use yyyy-MM-dd'T'HH:mm");
            return "quit-plan";
        } catch (RuntimeException e) {
            model.addAttribute("error", "Error saving quit plan: " + e.getMessage());
            return "quit-plan";
        }
    }    @GetMapping("/quit-progress")
    public String quitProgress(Model model) {
        QuitPlan quitPlan = quitPlanService.getCurrentUserQuitPlan();
        if (quitPlan == null || quitPlan.getQuitDateTime() == null) {
            return "redirect:/quit-plan";
        }
        
        // Use utility method for time calculations
        long timeSinceQuitMs = SmokingCalculatorUtil.calculateTimeSinceQuit(quitPlan.getQuitDateTime());
        long hoursWithoutSmoking = SmokingCalculatorUtil.millisecondsToHours(timeSinceQuitMs);

        List<Milestone> milestones = MilestoneConstants.getHealthMilestones();
        milestones.forEach(m -> m.calculateProgress(timeSinceQuitMs));

        ObjectMapper objectMapper = new ObjectMapper();
        String milestonesJson;
        try {
            milestonesJson = objectMapper.writeValueAsString(milestones);
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error processing milestones", e);
        }

        model.addAttribute("quitPlan", quitPlan);
        model.addAttribute("quitDateTime", quitPlan.getQuitDateTime());
        model.addAttribute("hoursWithoutSmoking", hoursWithoutSmoking);
        model.addAttribute("moneySaved", quitPlanService.calculateMoneySaved(quitPlan));
        model.addAttribute("moneyGoal", quitPlan.getMoneyGoal());
        model.addAttribute("goalReached", quitPlan.hasReachedMoneyGoal());
        model.addAttribute("milestonesJson", milestonesJson);
        model.addAttribute("milestones", milestones);

        return "quit-progress";
    }
}