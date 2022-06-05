package com.jhosep32dev.coloresapi.repository;

import com.jhosep32dev.coloresapi.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.print.Pageable;
import java.util.List;

public interface ColorRepository extends JpaRepository<Color, Long> {

    @Query("SELECT max(c.id) FROM Color c")
    Long findLastId();

    Color findFirstById(Long colorId);

    Color findFirstByColor(String colorName);

}
