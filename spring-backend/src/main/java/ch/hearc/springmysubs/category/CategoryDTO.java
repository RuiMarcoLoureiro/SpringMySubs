package ch.hearc.springmysubs.category;

import lombok.*;

import java.io.Serializable;


@Data
public class CategoryDTO implements Serializable {
    private Long id;
    private String name;
}