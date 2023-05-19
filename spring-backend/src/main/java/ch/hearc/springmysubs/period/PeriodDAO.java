package ch.hearc.springmysubs.period;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PeriodDAO implements IPeriodDAO{
    private IPeriodRepository periodRepository;

    @Autowired
    public PeriodDAO(IPeriodRepository periodRepository) {
        this.periodRepository = periodRepository;
    }

    @Override
    public void save(Period period) {
        periodRepository.save(period);
    }

    @Override
    public Optional<Period> get(Long id) {
        return periodRepository.findById(id);
    }

    @Override
    public List<Period> getAll() {
        return periodRepository.findAll();
    }

    @Override
    public void update(Period period) {
        periodRepository.save(period);
    }

    @Override
    public void delete(Period period) {
        periodRepository.delete(period);
    }
}
