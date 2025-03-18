/**
 * Componente responsável pela exibição e gerenciamento das questões do quiz
 */
import quizService from '../services/quizService.js';

class QuestionComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentQuestionEl = document.getElementById('current-question');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.timerEl = document.getElementById('timer');
        this.questionProgressEl = document.getElementById('question-progress');
        this.difficultyIndicatorEl = document.getElementById('difficulty-indicator');
        this.questionEl = document.getElementById('question');
        this.optionsEl = document.getElementById('options');
        this.feedbackEl = document.getElementById('feedback');
        this.nextBtnEl = document.getElementById('next-btn');
        this.actionBtnEl = document.getElementById('action-btn');
        
        // Adiciona uma barra de progresso para o timer
        this.timerProgressBarEl = document.createElement('div');
        this.timerProgressBarEl.className = 'timer-progress-bar';
        const timerContainer = this.timerEl.parentElement;
        timerContainer.appendChild(this.timerProgressBarEl);
        
        // Cria o alerta de tempo esgotado
        this.createTimeUpAlert();
        
        // Cria o alerta de inatividade
        this.createInactivityAlert();
        
        this.selectedOptionIndex = null;
        this.maxTime = 30; // tempo máximo em segundos
        this.isRetryAttempt = false; // rastreia se é uma tentativa adicional
        
        this.init();
    }
    
    /**
     * Cria o alerta de tempo esgotado
     */
    createTimeUpAlert() {
        this.timeUpAlertEl = document.createElement('div');
        this.timeUpAlertEl.className = 'time-up-alert';
        this.timeUpAlertEl.innerHTML = `
            <div class="time-up-icon"><i class="fas fa-hourglass-end"></i></div>
            <h2 class="time-up-title">Tempo Esgotado!</h2>
            <p class="time-up-message">Você ainda pode responder esta pergunta. O que deseja fazer?</p>
            <div class="time-up-buttons">
                <button class="btn time-up-try-again-btn">Responder <i class="fas fa-redo-alt"></i></button>
                <button class="btn time-up-skip-btn">Pular <i class="fas fa-forward"></i></button>
            </div>
        `;
        
        // Adiciona o evento de clique no botão tentar novamente
        const tryAgainBtn = this.timeUpAlertEl.querySelector('.time-up-try-again-btn');
        tryAgainBtn.addEventListener('click', () => {
            this.tryAgainAfterTimeout();
        });
        
        // Adiciona o evento de clique no botão pular
        const skipBtn = this.timeUpAlertEl.querySelector('.time-up-skip-btn');
        skipBtn.addEventListener('click', () => {
            this.hideTimeUpAlert();
            this.handleNextQuestion();
        });
        
        this.container.appendChild(this.timeUpAlertEl);
    }
    
    /**
     * Cria o alerta de inatividade após segunda tentativa
     */
    createInactivityAlert() {
        this.inactivityAlertEl = document.createElement('div');
        this.inactivityAlertEl.className = 'time-up-alert inactivity-alert';
        this.inactivityAlertEl.innerHTML = `
            <div class="time-up-icon"><i class="fas fa-exclamation-triangle"></i></div>
            <h2 class="time-up-title">Inatividade Detectada!</h2>
            <p class="time-up-message">Parece que você não está respondendo às perguntas. Deseja reiniciar o quiz?</p>
            <div class="time-up-buttons">
                <button class="btn time-up-try-again-btn">Reiniciar Quiz <i class="fas fa-redo"></i></button>
            </div>
        `;
        
        // Adiciona o evento de clique no botão reiniciar
        const restartBtn = this.inactivityAlertEl.querySelector('.time-up-try-again-btn');
        restartBtn.addEventListener('click', () => {
            this.restartQuiz();
        });
        
        this.container.appendChild(this.inactivityAlertEl);
    }
    
    /**
     * Mostra o alerta de tempo esgotado
     */
    showTimeUpAlert() {
        // Verifica se já é uma segunda tentativa
        if (this.isRetryAttempt) {
            console.log("Segunda tentativa - avançando automaticamente");
            this.handleNextQuestion();
            return;
        }
        
        // Adiciona efeito de vibração na tela
        this.container.classList.add('shake');
        
        // Adiciona a classe show para mostrar o alerta
        setTimeout(() => {
            this.timeUpAlertEl.classList.add('show');
            this.container.classList.remove('shake');
        }, 300);
        
        // Reproduz som de alerta se disponível
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([100, 50, 100]);
        }
        
        console.log("Alerta de tempo esgotado exibido - primeira tentativa");
    }
    
    /**
     * Esconde o alerta de tempo esgotado
     */
    hideTimeUpAlert() {
        this.timeUpAlertEl.classList.remove('show');
    }
    
    /**
     * Mostra o alerta de inatividade
     */
    showInactivityAlert() {
        // Adiciona efeito de vibração na tela
        this.container.classList.add('shake');
        
        // Adiciona a classe show para mostrar o alerta
        setTimeout(() => {
            this.inactivityAlertEl.classList.add('show');
            this.container.classList.remove('shake');
        }, 300);
        
        // Reproduz som de alerta se disponível
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([200, 100, 200]);
        }
        
        console.log("Alerta de inatividade exibido");
    }
    
    /**
     * Esconde o alerta de inatividade
     */
    hideInactivityAlert() {
        this.inactivityAlertEl.classList.remove('show');
    }
    
    /**
     * Inicializa o componente e registra os eventos
     */
    init() {
        this.nextBtnEl.addEventListener('click', () => this.handleNextQuestion());
        
        // Atualiza total de questões
        this.totalQuestionsEl.textContent = quizService.questions.length;
    }
    
    /**
     * Exibe o componente e carrega a primeira questão
     */
    show() {
        this.container.style.display = 'block';
        this.loadCurrentQuestion();
        
        // Reinicia e inicia o quiz
        quizService.start((timeLeft) => this.updateTimer(timeLeft));
        
        // Anima a entrada do componente
        this.container.classList.add('animated');
    }
    
    /**
     * Esconde o componente
     */
    hide() {
        this.container.style.display = 'none';
    }
    
    /**
     * Carrega a questão atual do quiz
     */
    loadCurrentQuestion() {
        const currentQuestion = quizService.getCurrentQuestion();
        const progress = quizService.getProgress();
        
        // Resetar o estado de tentativa adicional para cada nova questão
        this.isRetryAttempt = false;
        this.maxTime = 30; // restaura o tempo máximo padrão
        
        // Atualiza número e progresso da questão
        this.currentQuestionEl.textContent = progress.current;
        this.questionProgressEl.style.width = `${progress.percentage}%`;
        
        // Atualiza indicador de dificuldade
        this.updateDifficultyIndicator(currentQuestion.difficulty);
        
        // Atualiza o texto da pergunta
        this.questionEl.textContent = currentQuestion.question;
        
        // Limpa feedback e botão de próxima
        this.feedbackEl.style.display = 'none';
        this.actionBtnEl.classList.remove('show');
        
        // Renderiza as opções
        this.renderOptions(currentQuestion.options);
        
        // Reset da seleção
        this.selectedOptionIndex = null;
    }
    
    /**
     * Atualiza o indicador de dificuldade da questão
     */
    updateDifficultyIndicator(difficulty) {
        // Remove todas as classes de dificuldade
        this.difficultyIndicatorEl.classList.remove('difficulty-easy', 'difficulty-medium', 'difficulty-hard');
        
        // Adiciona a classe de dificuldade correspondente
        this.difficultyIndicatorEl.classList.add(`difficulty-${difficulty}`);
        
        // Atualiza o texto e ícone
        let difficultyText = '';
        switch(difficulty) {
            case 'easy':
                difficultyText = '<i class="fas fa-circle"></i> Fácil';
                break;
            case 'medium':
                difficultyText = '<i class="fas fa-circle"></i> Médio';
                break;
            case 'hard':
                difficultyText = '<i class="fas fa-circle"></i> Difícil';
                break;
        }
        
        this.difficultyIndicatorEl.innerHTML = difficultyText;
    }
    
    /**
     * Renderiza as opções de resposta
     */
    renderOptions(options) {
        // Limpa as opções existentes
        this.optionsEl.innerHTML = '';
        
        // Cria e adiciona cada opção
        options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            optionEl.dataset.index = index;
            
            optionEl.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            // Adiciona evento de clique
            optionEl.addEventListener('click', () => this.handleOptionClick(optionEl, index));
            
            this.optionsEl.appendChild(optionEl);
        });
    }
    
    /**
     * Manipula o clique em uma opção
     */
    handleOptionClick(optionEl, index) {
        // Ignora se já tiver selecionado
        if (this.selectedOptionIndex !== null) return;
        
        // Marca como selecionada
        this.selectedOptionIndex = index;
        optionEl.classList.add('selected');
        
        // Submete a resposta
        const result = quizService.submitAnswer(index);
        
        // Mostra feedback
        this.showFeedback(result, index);
        
        // Marca as opções como corretas/incorretas
        this.markOptions();
        
        // Para o timer
        quizService.stopTimer();
        
        // Mostra o botão de próxima questão
        this.actionBtnEl.classList.add('show');
        console.log("Botão deve estar visível agora");
    }
    
    /**
     * Mostra o feedback para a resposta
     */
    showFeedback(result, selectedIndex) {
        this.feedbackEl.textContent = result.feedback;
        this.feedbackEl.className = `feedback ${result.isCorrect ? 'correct' : 'incorrect'}`;
        this.feedbackEl.style.display = 'block';
    }
    
    /**
     * Marca as opções como corretas/incorretas
     */
    markOptions() {
        const currentQuestion = quizService.getCurrentQuestion();
        const options = this.optionsEl.querySelectorAll('.option');
        
        options.forEach((option, index) => {
            if (index === currentQuestion.correct) {
                option.classList.add('correct');
            } else if (index === this.selectedOptionIndex) {
                if (index !== currentQuestion.correct) {
                    option.classList.add('incorrect');
                }
            }
        });
    }
    
    /**
     * Manipula o clique no botão de próxima questão
     */
    handleNextQuestion() {
        // Resetando o estado antes de avançar
        this.hideTimeUpAlert();
        this.isRetryAttempt = false;
        
        const nextQuestion = quizService.nextQuestion();
        
        if (nextQuestion) {
            this.loadCurrentQuestion();
        } else {
            // Quiz terminou, disparar evento
            const event = new CustomEvent('quizComplete');
            document.dispatchEvent(event);
        }
    }
    
    /**
     * Atualiza o temporizador
     */
    updateTimer(seconds) {
        // Formata os segundos como MM:SS
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        this.timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        // Atualiza a barra de progresso do timer
        const percentage = (seconds / this.maxTime) * 100;
        this.timerProgressBarEl.style.width = `${percentage}%`;
        
        // Muda a cor quando estiver acabando o tempo
        if (seconds <= 5) {
            this.timerProgressBarEl.style.backgroundColor = 'var(--danger)';
            // Adiciona classe de urgência quando faltam apenas 5 segundos
            this.timerEl.parentElement.classList.add('timer-urgent');
        } else if (seconds <= 10) {
            this.timerProgressBarEl.style.backgroundColor = 'var(--danger)';
            this.timerEl.parentElement.classList.remove('timer-urgent');
        } else {
            this.timerProgressBarEl.style.backgroundColor = this.isRetryAttempt ? 'var(--warning)' : 'var(--accent)';
            this.timerEl.parentElement.classList.remove('timer-urgent');
        }
        
        // Se o tempo acabou, mostra o alerta apropriado
        if (seconds === 0) {
            console.log("Tempo esgotado. isRetryAttempt = " + this.isRetryAttempt);
            
            // Se já for uma tentativa adicional, mostra alerta de inatividade
            if (this.isRetryAttempt) {
                console.log("Segunda tentativa esgotada, mostrando alerta de inatividade");
                this.showInactivityAlert();
            } else {
                this.showTimeUpAlert();
            }
        }
    }
    
    /**
     * Permite que o usuário tente novamente após o tempo esgotar
     */
    tryAgainAfterTimeout() {
        // Esconde o alerta
        this.hideTimeUpAlert();
        
        // Dá mais tempo para o usuário responder
        this.resetTimerForRetry();
        
        console.log("Tentativa adicional iniciada");
    }
    
    /**
     * Reinicia o timer com tempo reduzido para a tentativa adicional
     */
    resetTimerForRetry() {
        // Reinicia o timer com metade do tempo
        const retryTime = 15; // segundos
        this.isRetryAttempt = true; // marca como tentativa adicional
        this.maxTime = retryTime; // atualiza o tempo máximo para cálculo da porcentagem
        
        console.log("Timer resetado para tentativa adicional: " + retryTime + "s");
        
        quizService.timeLeft = retryTime;
        quizService.startTimer();
        
        // Adiciona uma classe para destacar o timer
        const timerContainer = this.timerEl.parentElement;
        timerContainer.classList.add('timer-retry');
        
        // Remove a classe após a animação
        setTimeout(() => {
            timerContainer.classList.remove('timer-retry');
        }, 1000);
    }
    
    /**
     * Reinicia o quiz completo
     */
    restartQuiz() {
        this.hideInactivityAlert();
        this.hideTimeUpAlert();
        
        // Resetar estados
        this.isRetryAttempt = false;
        this.selectedOptionIndex = null;
        this.maxTime = 30;
        
        // Reiniciar o quiz desde o início
        quizService.restart();
        this.loadCurrentQuestion();
        
        console.log("Quiz reiniciado por inatividade");
    }
}

export default QuestionComponent; 