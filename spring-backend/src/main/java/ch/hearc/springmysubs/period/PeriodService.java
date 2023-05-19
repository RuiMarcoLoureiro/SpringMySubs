package ch.hearc.springmysubs.period;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PeriodService implements IPeriodService{
    private final IPeriodDAO periodDAO;
    private final IPeriodMapper periodMapper;

    @Autowired
    public PeriodService(IPeriodDAO periodDAO, IPeriodMapper periodMapper) {
        this.periodDAO = periodDAO;
        this.periodMapper = periodMapper;
    }

    @Override
    public void savePeriod(PeriodDTO period) {
        periodDAO.save(periodMapper.toEntity(period));
    }

    @Override
    public PeriodDTO getPeriodById(Long id) {
        return periodDAO.get(id).map(periodMapper::toDto).orElse(null);
    }

    @Override
    public List<PeriodDTO> getAllPeriods() {
        return periodDAO.getAll().stream().map(periodMapper::toDto).toList();
    }

    @Override
    public void updatePeriod(PeriodDTO period) {
        periodDAO.update(periodMapper.toEntity(period));
    }

    @Override
    public void deletePeriod(PeriodDTO period) {
        periodDAO.delete(periodMapper.toEntity(period));
    }
}
