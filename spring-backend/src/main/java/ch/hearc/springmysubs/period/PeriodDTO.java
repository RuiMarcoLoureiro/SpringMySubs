package ch.hearc.springmysubs.period;

import lombok.Data;

import java.io.Serializable;

@Data
public class PeriodDTO implements Serializable {
    private Long id;
    private String name;
}
