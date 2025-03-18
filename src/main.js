/**
 * Arquivo principal que orquestra todos os componentes do quiz
 */
import QuestionComponent from './components/QuestionComponent.js';
import FormComponent from './components/FormComponent.js';
import ResultsComponent from './components/ResultsComponent.js';

class QuizApp {
    constructor() {
        // Inicializa os componentes
        this.introEl = document.getElementById('intro');
        this.startBtn = document.getElementById('start-btn');
        
        this.questionComponent = new QuestionComponent('question-container');
        this.formComponent = new FormComponent('form-container');
        this.resultsComponent = new ResultsComponent('results-container');
        
        this.init();
    }
    
    /**
     * Inicializa a aplicação e registra os eventos
     */
    init() {
        // Registra evento de início do quiz
        this.startBtn.addEventListener('click', () => this.startQuiz());
        
        // Registra eventos de transição entre componentes
        document.addEventListener('quizComplete', () => this.showForm());
        document.addEventListener('formSubmitted', (event) => this.showResults(event.detail.results));
    }
    
    /**
     * Inicia o quiz
     */
    startQuiz() {
        // Esconde a introdução com fade out
        this.introEl.classList.remove('animated');
        setTimeout(() => {
            this.introEl.style.display = 'none';
            
            // Mostra o componente de questões
            this.questionComponent.show();
        }, 300);
    }
    
    /**
     * Exibe o formulário após o quiz
     */
    showForm() {
        // Esconde o componente de questões
        this.questionComponent.hide();
        
        // Mostra o formulário
        this.formComponent.show();
    }
    
    /**
     * Exibe os resultados após o envio do formulário
     */
    showResults(results) {
        // Esconde o formulário
        this.formComponent.hide();
        
        // Mostra os resultados
        this.resultsComponent.show(results);
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
}); 