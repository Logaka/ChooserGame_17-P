package sdu.project.chooserback.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.project.chooserback.dto.GameInitDto;
import sdu.project.chooserback.dto.GameStartDto;
import sdu.project.chooserback.dto.TaskResponseDto;
import sdu.project.chooserback.enums.Level;
import sdu.project.chooserback.enums.Mode;
import sdu.project.chooserback.models.Task;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class GameSessionService {

    private final TaskService taskService;

    public GameStartDto startGame(GameInitDto dto) {
        Integer choosenPlayerId = chooseRandomPlayerId(dto.getPlayerIds());
        Mode mode = dto.getGameOption().getMode();

        GameStartDto gameStartDto = new GameStartDto();
        gameStartDto.setChoosenPlayerId(choosenPlayerId);

        if (mode == Mode.TASK) {
            String prompt = dto.getGameOption().getPrompt();
            Level level = dto.getGameOption().getTaskLevel();

            Task task = (prompt != null)
                    ? taskService.getGptTask(level, prompt)
                    : taskService.getRandomTask(level);

            gameStartDto.setSessionId(UUID.randomUUID().toString());
            gameStartDto.setTask(new TaskResponseDto(task.getTask(), task.getLevel()));
        } else {
            gameStartDto.setSessionId(null);
            gameStartDto.setTask(null);
        }

        return gameStartDto;
    }


    public Integer chooseRandomPlayerId(List<Integer> playerIds) {
        if (playerIds == null || playerIds.isEmpty()) {
            throw new IllegalArgumentException("Player IDs list cannot be empty");
        }

        int randomIndex = ThreadLocalRandom.current().nextInt(playerIds.size());
        return playerIds.get(randomIndex);
    }
}
