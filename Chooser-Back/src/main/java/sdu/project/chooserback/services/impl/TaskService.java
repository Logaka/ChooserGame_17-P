package sdu.project.chooserback.services.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.project.chooserback.enums.Level;
import sdu.project.chooserback.exceptions.ResourceNotFoundException;
import sdu.project.chooserback.models.Task;
import sdu.project.chooserback.repositories.TaskRepository;


@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CoherClient coherClient;

    public Task getRandomTask(Level level) {
        return taskRepository.findRandomTaskByLevel(level)
                .orElseThrow(() -> new ResourceNotFoundException("Task with that taskLevel" + level.name() + " does not exist."));
    }


    public Task getGptTask(Level level, String prompt){
        String gptTask = coherClient.getTaskByPrompt(level, prompt);

        Task task = new Task();
        task.setTask(gptTask);
        task.setLevel(level);
        return task;
    }
}
