package com.example.quitsmokingapp.model;

import com.example.quitsmokingapp.util.SmokingCalculatorUtil;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class QuitPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private LocalDateTime quitDateTime;
    private int cigarettesPerDay;
    private double pricePerPack;
    private double moneyGoal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getQuitDateTime() {
        return quitDateTime;
    }

    public void setQuitDateTime(LocalDateTime quitDateTime) {
        this.quitDateTime = quitDateTime;
    }

    public int getCigarettesPerDay() {
        return cigarettesPerDay;
    }

    public void setCigarettesPerDay(int cigarettesPerDay) {
        this.cigarettesPerDay = cigarettesPerDay;
    }

    public double getPricePerPack() {
        return pricePerPack;
    }

    public void setPricePerPack(double pricePerPack) {
        this.pricePerPack = pricePerPack;
    }

    public double getMoneyGoal() {
        return moneyGoal;
    }

    public void setMoneyGoal(double moneyGoal) {
        this.moneyGoal = moneyGoal;
    }    public long getHoursWithoutSmoking() {
        if (quitDateTime == null) {
            return 0;
        }
        long timeSinceQuitMs = SmokingCalculatorUtil.calculateTimeSinceQuit(quitDateTime);
        return timeSinceQuitMs / (1000L * 60 * 60); // Convert milliseconds to hours
    }

    public double getMoneySaved() {
        if (quitDateTime == null) {
            return 0.0;
        }
        long timeSinceQuitMs = SmokingCalculatorUtil.calculateTimeSinceQuit(quitDateTime);
        return SmokingCalculatorUtil.calculateMoneySaved(timeSinceQuitMs, cigarettesPerDay, pricePerPack);
    }

    public boolean hasReachedMoneyGoal() {
        return getMoneySaved() >= moneyGoal;
    }
}