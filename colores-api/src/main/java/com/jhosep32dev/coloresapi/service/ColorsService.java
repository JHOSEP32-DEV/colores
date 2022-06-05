package com.jhosep32dev.coloresapi.service;

import com.jhosep32dev.coloresapi.model.Color;
import com.jhosep32dev.coloresapi.model.PaginationDTO;

import java.util.List;

public interface ColorsService {

    PaginationDTO<Color> getAllColors(Integer page);

    Color getColor(Long colorId) throws Exception;

    Color createColor(Color color) throws Exception;

    Color updateColor(Long colorId, Color color) throws Exception;

    void deleteColor(Long colorId) throws Exception;

}
