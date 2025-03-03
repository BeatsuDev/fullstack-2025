package com.ericbs.backend.calculation;

import com.ericbs.backend.calculation.dto.CalculationDTO;
import com.ericbs.backend.calculation.dto.CalculationErrorDTO;
import com.ericbs.backend.calculation.dto.CalculationRequestDTO;
import com.ericbs.backend.calculation.service.CalculationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/calculate")
public class CalculationController {
    private final CalculationService calculationService;

    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping
    public ResponseEntity<Object> calculateExpression(@RequestBody CalculationRequestDTO request) {
        try {
            String expression = request.expression();
            double result = calculationService.calculate(expression);
            return ResponseEntity.ok(new CalculationDTO(expression, result));
        } catch (ArithmeticException error) {
            CalculationErrorDTO errorResponse = new CalculationErrorDTO(request.expression(), error.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
