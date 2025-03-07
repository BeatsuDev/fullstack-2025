package com.ericbs.backend.user;

import com.ericbs.backend.common.dtos.GenericErrorDTO;
import com.ericbs.backend.user.dtos.JwtTokenDTO;
import com.ericbs.backend.user.dtos.LoginRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {
    @PostMapping("/user/token")
    public ResponseEntity<Object> createSession(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }

    // Usually this endpoint would take in a refresh token, and then return a new access token.
    // In this case, because refresh tokens haven't been explained in the lecture, the access token
    // will serve both as a refresh token and an access token.
    @PutMapping("/user/token")
    public ResponseEntity<Object> refreshSession(@RequestBody JwtTokenDTO jwtToken) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }
}
