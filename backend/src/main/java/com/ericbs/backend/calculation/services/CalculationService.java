package com.ericbs.backend.calculation.services;

import net.objecthunter.exp4j.ExpressionBuilder;
import org.springframework.stereotype.Service;

@Service
public class CalculationService {
    public double calculate(String expression) {
        return new ExpressionBuilder(expression).build().evaluate();
    }
}
