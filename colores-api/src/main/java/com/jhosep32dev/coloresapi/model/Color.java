package com.jhosep32dev.coloresapi.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "colors")
public class Color {

    @Id
    @Column(name = "id")
    private Long id;

    @Column
    @NotNull(message = "Name cannot be null")
    private String name;

    @Column
    @NotNull
    private String color;

    @Column
    private String pantone;

    @Column
    private Integer period;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getPantone() {
        return pantone;
    }

    public void setPantone(String pantone) {
        this.pantone = pantone;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }
}
