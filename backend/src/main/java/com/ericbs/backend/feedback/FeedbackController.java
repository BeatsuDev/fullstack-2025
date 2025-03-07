package com.ericbs.backend.feedback;

import com.ericbs.backend.common.dtos.GenericError;
import com.ericbs.backend.feedback.dtos.NewFeedbackRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {
    @PostMapping("/feedback")
    public ResponseEntity<Object> feedback(@RequestBody NewFeedbackRequest feedback) {
        return ResponseEntity.status(501).body(new GenericError("Not implemented yet."));
    }
}
