package ch.hearc.springmysubs.subscription.requests;

import lombok.Data;

import java.io.Serializable;

@Data
public class SortFilterRequest implements Serializable {
    private Boolean sortASC;
    private String sortColumn;
    private Long categoryId;
}
