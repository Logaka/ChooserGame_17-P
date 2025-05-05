package sdu.project.chooserback.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import sdu.project.chooserback.dto.GameInitDto;
import sdu.project.chooserback.dto.GameOptionDto;
import sdu.project.chooserback.dto.GameStartDto;
import sdu.project.chooserback.enums.Level;
import sdu.project.chooserback.enums.Mode;
import sdu.project.chooserback.models.Task;
import sdu.project.chooserback.services.impl.GameSessionService;
import sdu.project.chooserback.services.impl.TaskService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GameSessionServiceTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private GameSessionService gameSessionService;

    @Test
    void startGame_withPrompt_shouldCallGetGPTTask(){
        //given
        List<Integer> playerIds = List.of(1, 2, 3);

        GameOptionDto gameOptionDto = new GameOptionDto();
        gameOptionDto.setMode(Mode.TASK);
        gameOptionDto.setTaskLevel(Level.EASY);
        gameOptionDto.setPrompt("funny");

        GameInitDto gameInitDto = new GameInitDto();
        gameInitDto.setPlayerIds(playerIds);
        gameInitDto.setGameOption(gameOptionDto);

        Task mockedTask = new Task();
        mockedTask.setTask("Gpt task");
        mockedTask.setLevel(Level.EASY);

        when(taskService.getGptTask(gameOptionDto.getTaskLevel(), gameOptionDto.getPrompt()))
                .thenReturn(mockedTask);

        //when
        GameStartDto result = gameSessionService.startGame(gameInitDto);

        //then
        assertNotNull(result.getSessionId());
        assertTrue(playerIds.contains(result.getChoosenPlayerId()));
        assertEquals("Gpt task", result.getTask().getText());
        assertEquals(Level.EASY, result.getTask().getLevel());

        verify(taskService).getGptTask(Level.EASY, "funny");
    }

    @Test
    void startGame_withoutPrompt_shouldCallGetRandomTask() {
        // given
        List<Integer> playerIds = List.of(5);
        GameOptionDto option = new GameOptionDto();
        option.setMode(Mode.TASK);
        option.setPrompt(null);
        option.setTaskLevel(Level.MEDIUM);

        GameInitDto dto = new GameInitDto();
        dto.setPlayerIds(playerIds);
        dto.setGameOption(option);

        Task mockedTask = new Task();
        mockedTask.setTask("Random Task");
        mockedTask.setLevel(Level.MEDIUM);

        when(taskService.getRandomTask(Level.MEDIUM)).thenReturn(mockedTask);

        // when
        GameStartDto result = gameSessionService.startGame(dto);

        // then
        assertNotNull(result.getSessionId());
        assertEquals("Random Task", result.getTask().getText());
        assertEquals(Level.MEDIUM, result.getTask().getLevel());
        assertEquals(5, result.getChoosenPlayerId());

        verify(taskService).getRandomTask(Level.MEDIUM);
    }

    @Test
    void startGame_withNonTaskMode_shouldReturnNullTask() {
        // given
        List<Integer> playerIds = List.of(10,11);
        GameOptionDto option = new GameOptionDto();
        option.setMode(Mode.RANDOM);

        GameInitDto dto = new GameInitDto();
        dto.setPlayerIds(playerIds);
        dto.setGameOption(option);

        // when
        GameStartDto result = gameSessionService.startGame(dto);

        // then
        assertEquals(10, result.getChoosenPlayerId());
        assertNull(result.getTask());
        assertNull(result.getSessionId());

        verifyNoInteractions(taskService);
    }
}