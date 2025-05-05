package sdu.project.chooserback.services;

import sdu.project.chooserback.exceptions.ResourceNotFoundException;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public abstract class AbstractAiClient implements AiClient{

    protected String getSystemPrompt(){
        try {
            return Files.readString(Paths.get("prompt.txt"), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new ResourceNotFoundException(e.getMessage().trim());
        }
    };

}
