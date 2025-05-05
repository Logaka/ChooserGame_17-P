package sdu.project.chooserback.services.impl;

import com.cohere.api.Cohere;
import com.cohere.api.requests.ChatRequest;
import com.cohere.api.types.ChatMessage;
import com.cohere.api.types.Message;
import com.cohere.api.types.NonStreamedChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sdu.project.chooserback.enums.Level;
import sdu.project.chooserback.services.AbstractAiClient;

import java.util.List;

@Service
public class CoherClient extends AbstractAiClient {

    @Value("${token}")
    private String token;

    @Override
    public String getTaskByPrompt(Level taskLevel, String prompt) {

        ChatMessage chatMessage = ChatMessage.builder().message(getSystemPrompt())
                .build();

        Cohere cohere = Cohere
                .builder()
                .token(token)
                .clientName("default")
                .build();

        NonStreamedChatResponse response = cohere.chat(
                ChatRequest.builder()
                        .message("Создай задание уровня "+ taskLevel + ", " + prompt)
                        .chatHistory(List.of(Message.chatbot(chatMessage)))
                        .model("command-r-plus")
                        .temperature(0.1)
                        .build()
        );
        return response.getText().trim();
    }
}
