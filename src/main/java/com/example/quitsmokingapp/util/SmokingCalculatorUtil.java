package com.example.quitsmokingapp.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 * Utility class for time and smoking-related calculations
 */
public final class SmokingCalculatorUtil {
    
    private SmokingCalculatorUtil() {
        // Utility class - prevent instantiation
    }
    
    /**
     * Calculates the time elapsed since quit date in milliseconds
     * @param quitDateTime The quit date and time
     * @return Time elapsed in milliseconds
     */
    public static long calculateTimeSinceQuit(LocalDateTime quitDateTime) {
        LocalDateTime quitDateTimeUTC = quitDateTime
                .atZone(ZoneId.systemDefault())
                .withZoneSameInstant(ZoneOffset.UTC)
                .toLocalDateTime();
        return System.currentTimeMillis() - quitDateTimeUTC.toInstant(ZoneOffset.UTC).toEpochMilli();
    }
    
    /**
     * Calculates money saved based on quit plan parameters
     * @param timeSinceQuitMs Time since quit in milliseconds
     * @param cigarettesPerDay Number of cigarettes smoked per day
     * @param pricePerPack Price per pack of cigarettes
     * @return Money saved
     */
    public static double calculateMoneySaved(long timeSinceQuitMs, int cigarettesPerDay, double pricePerPack) {
        if (timeSinceQuitMs <= 0) {
            return 0.0;
        }
        
        long timeSinceQuitDays = timeSinceQuitMs / (1000L * 60 * 60 * 24);
        double cigarettesNotSmoked = (double) cigarettesPerDay * timeSinceQuitDays;
        double packsNotSmoked = cigarettesNotSmoked / 20.0; // Assuming 20 cigarettes per pack
        
        return packsNotSmoked * pricePerPack;
    }
    
    /**
     * Calculates the number of cigarettes not smoked
     * @param timeSinceQuitMs Time since quit in milliseconds
     * @param cigarettesPerDay Number of cigarettes normally smoked per day
     * @return Number of cigarettes not smoked
     */
    public static long calculateCigarettesNotSmoked(long timeSinceQuitMs, int cigarettesPerDay) {
        if (timeSinceQuitMs <= 0) {
            return 0;
        }
        
        long timeSinceQuitHours = timeSinceQuitMs / (1000L * 60 * 60);
        double cigarettesPerHour = (double) cigarettesPerDay / 24.0;
        
        return Math.round(cigarettesPerHour * timeSinceQuitHours);
    }
    
    /**
     * Formats time duration in a human-readable format
     * @param milliseconds Time in milliseconds
     * @return Formatted string (e.g., "5d 3h 20m 15s")
     */
    public static String formatDuration(long milliseconds) {
        if (milliseconds < 0) {
            return "0s";
        }
        
        long seconds = milliseconds / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        
        seconds %= 60;
        minutes %= 60;
        hours %= 24;
        
        StringBuilder result = new StringBuilder();
        if (days > 0) result.append(days).append("d ");
        if (hours > 0) result.append(hours).append("h ");
        if (minutes > 0) result.append(minutes).append("m ");
        if (seconds > 0 || result.length() == 0) result.append(seconds).append("s");
        
        return result.toString().trim();
    }
    
    /**
     * Converts milliseconds to hours
     * @param milliseconds Time in milliseconds
     * @return Time in hours
     */
    public static long millisecondsToHours(long milliseconds) {
        return milliseconds / (1000L * 60 * 60);
    }
}
