const aiPromptTextarea = document.getElementById("ai-prompt");
const saveAiPromptBtn = document.getElementById("save-ai-prompt");

const saveAiPrompt = () => {
    const promptText = aiPromptTextarea.value.trim();
    localStorage.setItem('aiPrompt', promptText);
    console.log('AI Prompt saved:', promptText);
    
    const aiPromptModal = bootstrap.Modal.getInstance(document.getElementById('aiPromptModal'));
    if (aiPromptModal) {
        aiPromptModal.hide();
    }
};

const loadAiPrompt = () => {
    const savedPrompt = localStorage.getItem('aiPrompt') || '';
    aiPromptTextarea.value = savedPrompt;
};

saveAiPromptBtn.addEventListener("click", saveAiPrompt);

document.addEventListener('DOMContentLoaded', () => {
    const aiPromptModal = document.getElementById('aiPromptModal');
    
    aiPromptModal.addEventListener('shown.bs.modal', () => {
        console.log('AI Prompt modal opened, loading saved prompt');
        loadAiPrompt();
        aiPromptTextarea.focus();
    });
}); 