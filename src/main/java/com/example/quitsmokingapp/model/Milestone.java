package com.example.quitsmokingapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a health milestone in the quit smoking journey
 */
public class Milestone {
    private String name;
    private long durationMs;
    private String duration;
    private double progress;

    public Milestone(String name, long durationMs, String duration) {
        this.name = name;
        this.durationMs = durationMs;
        this.duration = duration;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getDurationMs() {
        return durationMs;
    }

    public void setDurationMs(long durationMs) {
        this.durationMs = durationMs;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    @JsonProperty("progress")
    public double getProgress() {
        return progress;
    }

    public void setProgress(double progress) {
        this.progress = progress;
    }

    /**
     * Calculates the progress percentage based on time elapsed since quitting
     * @param timeSinceQuitMs Time in milliseconds since quit date
     */
    public void calculateProgress(long timeSinceQuitMs) {
        this.progress = Math.min(100, (double) timeSinceQuitMs / durationMs * 100);
    }

    @Override
    public String toString() {
        return "Milestone{" +
                "name='" + name + '\'' +
                ", duration='" + duration + '\'' +
                ", progress=" + String.format("%.1f", progress) + "%" +
                '}';
    }
}
