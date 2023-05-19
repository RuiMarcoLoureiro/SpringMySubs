package ch.hearc.springmysubs.period;

import java.util.List;

public interface IPeriodService {
    public void savePeriod(PeriodDTO period);
    public PeriodDTO getPeriodById(Long id);
    public List<PeriodDTO> getAllPeriods();
    public void updatePeriod(PeriodDTO period);
    public void deletePeriod(PeriodDTO period);
}
