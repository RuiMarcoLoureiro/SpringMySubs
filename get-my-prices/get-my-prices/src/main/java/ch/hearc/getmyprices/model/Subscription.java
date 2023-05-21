package main.java.ch.hearc.getmyprices.model;

import java.util.Objects;

import org.springframework.format.annotation.NumberFormat;
import org.springframework.format.annotation.NumberFormat.Style;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class Subscription {
    private Long id;

    @Size(min = 2, max = 30, message = "Name must be between 2 and 30 characters")
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotNull(message = "Price is mandatory")
    @PositiveOrZero(message = "Price must be positive")
    @NumberFormat(style = Style.CURRENCY)
    private Double price;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public void setName(String name) {
        this.name = Objects.requireNonNull(name);
    }

    public void setPrice(Double price) {
        this.price = Objects.requireNonNull(price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!(obj instanceof Subscription))
            return false;
        Subscription other = (Subscription) obj;
        return Objects.equals(id, other.id) && Objects.equals(name, other.name) && Objects.equals(price, other.price);
    }

}