package com.example.quitsmokingapp.config;

import com.example.quitsmokingapp.model.Milestone;
import java.util.Arrays;
import java.util.List;

/**
 * Constants for health milestones in the quit smoking journey
 */
public final class MilestoneConstants {
    
    private MilestoneConstants() {
        // Utility class - prevent instantiation
    }
    
    // Time constants in milliseconds
    private static final long MINUTE_MS = 60 * 1000L;
    private static final long HOUR_MS = 60 * MINUTE_MS;
    private static final long DAY_MS = 24 * HOUR_MS;
    private static final long MONTH_MS = 30 * DAY_MS;
    private static final long YEAR_MS = 365 * DAY_MS;
    
    /**
     * Creates the standard list of health milestones for quitting smoking
     * @return List of milestones with their timeframes
     */
    public static List<Milestone> getHealthMilestones() {
        return Arrays.asList(
            new Milestone("Pulse rate normalizes", 20 * MINUTE_MS, "20 minutes"),
            new Milestone("Oxygen levels improve", 8 * HOUR_MS, "8 hours"),
            new Milestone("Carbon monoxide eliminated", 24 * HOUR_MS, "24 hours"),
            new Milestone("Nicotine level drops", 2 * DAY_MS, "2 days"),
            new Milestone("Taste and smell improve", 3 * DAY_MS, "3 days"),
            new Milestone("Breathing improves", 3 * DAY_MS, "3 days"),
            new Milestone("Energy increases", 4 * DAY_MS, "4 days"),
            new Milestone("Blood circulation improves", 3 * MONTH_MS, "3 months"),
            new Milestone("Heart disease risk reduces", YEAR_MS, "1 year"),
            new Milestone("Lung cancer risk reduces", 10 * YEAR_MS, "10 years")
        );
    }
}
