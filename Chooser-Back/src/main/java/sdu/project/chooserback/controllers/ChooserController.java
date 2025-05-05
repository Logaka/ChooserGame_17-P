package sdu.project.chooserback.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.project.chooserback.dto.GameInitDto;
import sdu.project.chooserback.services.impl.GameSessionService;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1")
@CrossOrigin
public class ChooserController {

    private final GameSessionService gameSessionService;

    @PostMapping("/start")
    public ResponseEntity<?> initGame(@RequestBody @Valid GameInitDto dto) throws IOException {
        return ResponseEntity.ok(gameSessionService.startGame(dto));
    }

}
