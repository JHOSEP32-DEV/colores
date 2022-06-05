package com.jhosep32dev.coloresapi.controller;

import com.jhosep32dev.coloresapi.model.Color;
import com.jhosep32dev.coloresapi.model.PaginationDTO;
import com.jhosep32dev.coloresapi.security.model.JWTRequest;
import com.jhosep32dev.coloresapi.security.model.JWTResponse;
import com.jhosep32dev.coloresapi.service.ColorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ColorsController {

    @Autowired
    private ColorsService colorsService;

    @GetMapping("/colors")
    public ResponseEntity<PaginationDTO<Color>> getAllColors(@RequestParam("page") Integer page) {
        return ResponseEntity.ok(colorsService.getAllColors(page));
    }

    @GetMapping("/colors/{colorId}")
    @RolesAllowed("ADMIN")
    public ResponseEntity<Color> getColor(@PathVariable Long colorId) throws Exception {
        return ResponseEntity.ok(colorsService.getColor(colorId));
    }

    @PostMapping("/colors")
    public ResponseEntity<Color> createColor(@RequestBody Color color) throws Exception {
        return ResponseEntity.ok(colorsService.createColor(color));
    }

    @PutMapping("/colors/{colorId}")
    public ResponseEntity<Color> updateColor(@PathVariable Long colorId, @RequestBody Color color) throws Exception {
        return ResponseEntity.ok(colorsService.updateColor(colorId, color));
    }

    @DeleteMapping("/colors/{colorId}")
    public ResponseEntity<Void> deleteColor(@PathVariable Long colorId) throws Exception {
        colorsService.deleteColor(colorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
