package ch.hearc.springmysubs.period;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/period")
public class PeriodController {
    private final IPeriodService periodService;

    @Autowired
    public PeriodController(IPeriodService periodService) {
        this.periodService = periodService;
    }

    @PutMapping("/")
    public void savePeriod(@RequestBody @NotNull @Valid PeriodDTO periodDTO) {
        periodService.savePeriod(periodDTO);
    }

    @GetMapping("/{id}")
    public PeriodDTO getPeriod(@PathVariable Long id) {
        return periodService.getPeriodById(id);
    }

    @GetMapping("/")
    public List<PeriodDTO> getAllPeriods() {
        return periodService.getAllPeriods();
    }

    @PostMapping("/")
    public void updatePeriod(@RequestBody @NotNull @Valid PeriodDTO periodDTO) {
        periodService.updatePeriod(periodDTO);
    }

    @DeleteMapping("/{id}")
    public void deletePeriod(@PathVariable PeriodDTO periodDTO) {
        periodService.deletePeriod(periodDTO);
    }
}
