/**
 * Componente responsável pelo formulário de coleta de dados do usuário
 */
import quizService from '../services/quizService.js';

class FormComponent {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.areaSelect = document.getElementById('area');
        this.submitBtn = document.getElementById('submit-form');
        
        this.init();
    }
    
    /**
     * Inicializa o componente e registra os eventos
     */
    init() {
        this.submitBtn.addEventListener('click', () => this.handleSubmit());
        
        // Adiciona validação nos campos
        this.nameInput.addEventListener('input', (e) => this.validateField(e.target));
        this.emailInput.addEventListener('input', (e) => this.validateField(e.target));
        this.areaSelect.addEventListener('change', (e) => this.validateField(e.target));
    }
    
    /**
     * Exibe o componente com animação
     */
    show() {
        this.container.style.display = 'block';
        this.container.classList.add('animated');
    }
    
    /**
     * Esconde o componente
     */
    hide() {
        this.container.style.display = 'none';
    }
    
    /**
     * Valida um campo do formulário
     */
    validateField(field) {
        if (!field.value) {
            field.style.borderColor = 'var(--danger)';
            return false;
        } else {
            // Validação adicional para email
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.style.borderColor = 'var(--danger)';
                    return false;
                }
            }
            
            field.style.borderColor = 'var(--accent)';
            return true;
        }
    }
    
    /**
     * Valida o formulário completo
     */
    validateForm() {
        const nameValid = this.validateField(this.nameInput);
        const emailValid = this.validateField(this.emailInput);
        const areaValid = this.validateField(this.areaSelect);
        
        return nameValid && emailValid && areaValid;
    }
    
    /**
     * Manipula o envio do formulário
     */
    handleSubmit() {
        // Verifica se o formulário é válido
        if (!this.validateForm()) {
            // Destaca campos inválidos (já feito pela validação)
            return;
        }
        
        // Desabilita o botão enquanto processa
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Processando...';
        
        // Coleta os dados do formulário
        const formData = {
            name: this.nameInput.value,
            email: this.emailInput.value,
            area: this.areaSelect.value
        };
        
        // Envia para o serviço
        quizService.submitForm(formData, (results) => {
            // Dispara evento de envio completo
            const event = new CustomEvent('formSubmitted', { 
                detail: { results } 
            });
            document.dispatchEvent(event);
            
            // Reseta o estado
            this.resetForm();
        });
    }
    
    /**
     * Reseta o formulário
     */
    resetForm() {
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.areaSelect.value = '';
        
        // Reseta os estilos
        this.nameInput.style.borderColor = 'var(--card-border)';
        this.emailInput.style.borderColor = 'var(--card-border)';
        this.areaSelect.style.borderColor = 'var(--card-border)';
        
        // Reabilita o botão
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = 'Receber Resultado + Guia Exclusivo ✓';
    }
}

export default FormComponent; 