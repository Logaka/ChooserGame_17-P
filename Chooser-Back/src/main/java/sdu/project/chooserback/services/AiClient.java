package sdu.project.chooserback.services;

import org.springframework.beans.factory.annotation.Value;
import sdu.project.chooserback.enums.Level;

public interface AiClient {
    String getTaskByPrompt(Level taskLevel, String prompt);
}
