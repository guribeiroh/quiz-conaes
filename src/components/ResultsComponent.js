/**
 * Componente responsável por exibir os resultados do quiz
 */
import quizService from '../services/quizService.js';

class ResultsComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.medalEl = document.getElementById('result-medal');
        this.titleEl = document.getElementById('result-title');
        this.messageEl = document.getElementById('result-message');
        this.progressBarEl = document.getElementById('progress-bar-result');
        this.ctaMessageEl = document.getElementById('cta-message');
        this.ctaButtonEl = document.getElementById('cta-btn');
    }
    
    /**
     * Exibe o componente com os resultados
     */
    show(results) {
        // Atualiza os elementos com os resultados
        this.medalEl.textContent = results.medal;
        this.titleEl.textContent = results.title;
        this.messageEl.textContent = results.message;
        
        // Atualiza a barra de progresso
        this.progressBarEl.style.width = `${results.percentage}%`;
        this.progressBarEl.textContent = `${results.correctAnswers}/${results.total} (${Math.round(results.percentage)}%)`;
        
        // Define a cor da barra de progresso baseado no desempenho
        if (results.percentage >= 80) {
            this.progressBarEl.style.background = 'linear-gradient(135deg, var(--success) 0%, #27ae60 100%)';
        } else if (results.percentage >= 60) {
            this.progressBarEl.style.background = 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)';
        } else if (results.percentage >= 40) {
            this.progressBarEl.style.background = 'linear-gradient(135deg, var(--warning) 0%, #d35400 100%)';
        } else {
            this.progressBarEl.style.background = 'linear-gradient(135deg, var(--danger) 0%, #c0392b 100%)';
        }
        
        // Personaliza a mensagem CTA baseado no desempenho
        if (results.percentage >= 80) {
            this.ctaMessageEl.textContent = 'Parabéns pelo excelente desempenho! Que tal aprofundar ainda mais seus conhecimentos com nosso curso avançado?';
        } else if (results.percentage >= 60) {
            this.ctaMessageEl.textContent = 'Você tem um bom conhecimento base! Nosso curso pode ajudá-lo a dominar os conceitos mais avançados.';
        } else {
            this.ctaMessageEl.textContent = 'Identificamos alguns pontos importantes para melhorar. Nosso curso foi desenvolvido para ajudá-lo a dominar esses conceitos!';
        }
        
        // Exibe o container com animação
        this.container.style.display = 'block';
        this.container.classList.add('animated');
        
        // Adiciona evento no botão CTA
        this.ctaButtonEl.addEventListener('click', this.handleCTAClick);
    }
    
    /**
     * Esconde o componente
     */
    hide() {
        this.container.style.display = 'none';
    }
    
    /**
     * Manipula o clique no botão CTA
     */
    handleCTAClick = () => {
        // Aqui você pode adicionar a lógica para redirecionar para a página de vendas
        // ou abrir um modal com mais informações sobre o curso
        window.location.href = '/curso-anatomia-clinica';
    }
}

export default ResultsComponent; 