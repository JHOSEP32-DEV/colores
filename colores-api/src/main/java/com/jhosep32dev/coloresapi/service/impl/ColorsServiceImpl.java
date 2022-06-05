package com.jhosep32dev.coloresapi.service.impl;

import com.jhosep32dev.coloresapi.model.Color;
import com.jhosep32dev.coloresapi.model.PaginationDTO;
import com.jhosep32dev.coloresapi.repository.ColorRepository;
import com.jhosep32dev.coloresapi.service.ColorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@Component
public class ColorsServiceImpl implements ColorsService {

    @Value("${pagination.items-per-page}")
    private Integer itemsPerPage;

    @Autowired
    private ColorRepository colorRepository;

    @Override
    public PaginationDTO<Color> getAllColors(Integer page) {
        if (page < 0) {
            page = 0;
        }

        return new PaginationDTO<Color>(colorRepository.findAll(PageRequest.of(page, itemsPerPage)));
    }

    @Override
    public Color getColor(Long colorId) throws Exception {
        Color color = colorRepository.findFirstById(colorId);

        if (color == null) {
            throw new Exception("Color not exists");
        }

        return colorRepository.findFirstById(colorId);
    }

    @Override
    public Color createColor(Color color) throws Exception {
        Color oldColor = colorRepository.findFirstByColor(color.getColor());

        if (oldColor != null) {
            throw new Exception("Color already exists.");
        }

        // Me toco hacer la busqueda del ultimo id manualmente porque el H2 no esta reconociendo el autoincremental
        // ya que se esta cargando la data en memoria al arrancar la app, cosa que no pasaria con un gestor real.
        Long lastId = colorRepository.findLastId();
        color.setId(lastId + 1);

        return colorRepository.save(color);
    }

    @Override
    public Color updateColor(Long colorId, Color color) throws Exception {
        Color oldColor = colorRepository.findFirstById(colorId);

        if (oldColor == null) {
            throw new Exception("Color not found");
        }

        // Lo seteamos para usar la data que recibimos desde el cliente
        color.setId(oldColor.getId());

        return colorRepository.save(color);
    }

    @Override
    public void deleteColor(Long colorId) throws Exception {
        Color color = colorRepository.findFirstById(colorId);

        if (color == null) {
            throw new Exception("Color not found");
        }

        colorRepository.delete(color);
    }
}
