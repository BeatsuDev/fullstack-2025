package com.ericbs.backend.user;

import com.ericbs.backend.common.dtos.GenericErrorDTO;
import com.ericbs.backend.user.dtos.NewUserRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @PostMapping("/user")
    public ResponseEntity<Object> createUser(NewUserRequestDTO data) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }

    @PutMapping("/user")
    public ResponseEntity<Object> updateUser(NewUserRequestDTO data) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Object> getUser(@PathVariable("userId") String userId) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Object> deleteUser(@PathVariable("userId") String userId) {
        return ResponseEntity.status(501).body(new GenericErrorDTO("Not implemented yet."));
    }
}
