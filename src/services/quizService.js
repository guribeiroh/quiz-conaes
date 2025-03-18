/**
 * Serviço responsável pela lógica e gerenciamento do estado do quiz
 */
import questions from '../data/questions.js';

class QuizService {
    constructor() {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timerInterval = null;
        this.timeLeft = 30;
        this.onTimerUpdate = null;
        this.onQuizComplete = null;
    }

    /**
     * Inicia o quiz e o temporizador
     */
    start(onTimerUpdate) {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.onTimerUpdate = onTimerUpdate;
        this.startTimer();
        
        return this.getCurrentQuestion();
    }

    /**
     * Retorna a questão atual
     */
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    /**
     * Verifica se a questão atual é a última
     */
    isLastQuestion() {
        return this.currentQuestionIndex === this.questions.length - 1;
    }

    /**
     * Avança para a próxima questão
     */
    nextQuestion() {
        this.stopTimer();
        this.timeLeft = 30;
        
        if (this.isLastQuestion()) {
            if (this.onQuizComplete) {
                this.onQuizComplete(this.getResults());
            }
            return null;
        }
        
        this.currentQuestionIndex++;
        this.startTimer();
        
        return this.getCurrentQuestion();
    }

    /**
     * Registra a resposta do usuário e retorna feedback
     */
    submitAnswer(optionIndex) {
        const currentQuestion = this.getCurrentQuestion();
        const isCorrect = optionIndex === currentQuestion.correct;
        
        this.userAnswers.push({
            questionId: currentQuestion.id,
            userAnswer: optionIndex,
            isCorrect: isCorrect
        });
        
        if (isCorrect) {
            this.score++;
        }
        
        this.stopTimer();
        
        return {
            isCorrect,
            feedback: isCorrect ? currentQuestion.correctFeedback : currentQuestion.incorrectFeedback
        };
    }

    /**
     * Retorna o progresso atual do quiz
     */
    getProgress() {
        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            percentage: ((this.currentQuestionIndex + 1) / this.questions.length) * 100
        };
    }

    /**
     * Inicia o temporizador para a questão atual
     */
    startTimer() {
        if (this.timerInterval) {
            this.stopTimer();
        }
        
        if (this.onTimerUpdate) {
            this.onTimerUpdate(this.timeLeft);
        }
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            
            if (this.onTimerUpdate) {
                this.onTimerUpdate(this.timeLeft);
            }
            
            if (this.timeLeft <= 0) {
                this.stopTimer();
            }
        }, 1000);
    }

    /**
     * Para o temporizador atual
     */
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    /**
     * Registra uma resposta automática quando o tempo acaba
     */
    submitTimeoutAnswer() {
        // Registra como uma resposta incorreta com índice -1 (tempo esgotado)
        this.userAnswers.push({
            questionId: this.getCurrentQuestion().id,
            userAnswer: -1,
            isCorrect: false,
            timedOut: true
        });
    }

    /**
     * Retorna os resultados completos do quiz
     */
    getResults() {
        const correctAnswers = this.userAnswers.filter(answer => answer.isCorrect).length;
        const percentage = (correctAnswers / this.questions.length) * 100;
        let medal, title, message;
        
        // Categoriza o desempenho
        if (percentage >= 80) {
            medal = '🥇';
            title = 'Excelente!';
            message = 'Você demonstrou um excelente conhecimento em Anatomia Clínica. Seus resultados mostram que você já domina conceitos importantes, mas a excelência é um processo contínuo de aprendizado.';
        } else if (percentage >= 60) {
            medal = '🥈';
            title = 'Muito Bom!';
            message = 'Você tem um bom conhecimento em Anatomia Clínica, mas ainda há espaço para aprimoramento em alguns conceitos específicos.';
        } else if (percentage >= 40) {
            medal = '🥉';
            title = 'Bom!';
            message = 'Você demonstrou conhecimento básico em Anatomia Clínica. Recomendamos revisar os conceitos fundamentais para melhorar sua prática clínica.';
        } else {
            medal = '📚';
            title = 'Necessita Estudo';
            message = 'Seu desempenho indica que você precisa fortalecer seus conhecimentos em Anatomia Clínica. Não desanime, é uma oportunidade para crescimento!';
        }
        
        return {
            answers: this.userAnswers,
            correctAnswers,
            total: this.questions.length,
            percentage,
            medal,
            title,
            message
        };
    }

    /**
     * Submete o formulário de contato
     */
    submitForm(formData, callback) {
        // Simula uma chamada de API
        setTimeout(() => {
            // Em um caso real, aqui seria feita uma chamada ao backend
            const results = {
                ...this.getResults(),
                userInfo: formData
            };
            
            if (callback) {
                callback(results);
            }
        }, 1000);
    }

    /**
     * Reinicia o quiz completamente
     */
    restart() {
        this.stopTimer();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.userAnswers = [];
        this.timeLeft = 30;
        this.startTimer();
        
        return this.getCurrentQuestion();
    }
}

// Retorna uma instância única do serviço
export default new QuizService(); 