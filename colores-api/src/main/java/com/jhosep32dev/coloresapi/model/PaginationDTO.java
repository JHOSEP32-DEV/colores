package com.jhosep32dev.coloresapi.model;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public class PaginationDTO<T> {

    private List<T> content;
    private Integer totalPages;
    private Long totalElements;
    private Integer elementsPerPage;
    private Integer size;
    private Integer pageNumber;
    private boolean first;
    private boolean last;

    public PaginationDTO(Page<T> page) {
        this.content = page.getContent();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.elementsPerPage = page.getSize();
        this.size = page.getNumberOfElements();
        this.pageNumber = page.getNumber();
        this.first = page.isFirst();
        this.last = page.isLast();
    }

    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(Long totalElements) {
        this.totalElements = totalElements;
    }

    public Integer getElementsPerPage() {
        return elementsPerPage;
    }

    public void setElementsPerPage(Integer elementsPerPage) {
        this.elementsPerPage = elementsPerPage;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public boolean isFirst() {
        return first;
    }

    public void setFirst(boolean first) {
        this.first = first;
    }

    public boolean isLast() {
        return last;
    }

    public void setLast(boolean last) {
        this.last = last;
    }
}
