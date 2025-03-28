package com.ericbs.backend.calculation;

import com.ericbs.backend.calculation.dtos.CalculationDTO;
import com.ericbs.backend.calculation.dtos.CalculationErrorDTO;
import com.ericbs.backend.calculation.dtos.CalculationRequestDTO;
import com.ericbs.backend.calculation.services.CalculationService;
import com.ericbs.backend.common.dtos.GenericErrorDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class CalculationController {
    private final CalculationService calculationService;

    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @PostMapping("/calculate")
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

    @GetMapping("/history/{userId}")
    public ResponseEntity<Object> getHistory(@PathVariable String userId) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }

    @DeleteMapping("/history/{userId}")
    public ResponseEntity<Object> deleteHistory(@PathVariable String userId) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }
}
