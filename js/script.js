// Script de inicialização do Quiz de Anatomia
document.addEventListener('DOMContentLoaded', function() {
    console.log("%c[Quiz Anatomia] DOM carregado completamente", "color: #b4fc00; font-weight: bold;");
    
    // Elementos principais
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizContainer = document.getElementById('quiz-container');
    const formContainer = document.getElementById('form-container');
    const resultsContainer = document.getElementById('results-container');
    
    // Elementos do quiz
    const questionNumber = document.getElementById('question-number');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const timerElement = document.getElementById('timer');
    
    // Botões
    const startButton = document.getElementById('start-button');
    
    // Elementos de feedback
    const feedbackOverlay = document.getElementById('feedbackOverlay');
    const correctFeedbackPopup = document.getElementById('correctFeedbackPopup');
    const incorrectFeedbackPopup = document.getElementById('incorrectFeedbackPopup');
    const timeoutFeedbackPopup = document.getElementById('timeoutFeedbackPopup');
    const correctFeedbackMessage = document.getElementById('correctFeedbackMessage');
    const incorrectFeedbackMessage = document.getElementById('incorrectFeedbackMessage');
    const correctAnswerText = document.getElementById('correctAnswerText');
    const correctNextBtn = document.getElementById('correctNextBtn');
    const incorrectNextBtn = document.getElementById('incorrectNextBtn');
    const timeoutRetryBtn = document.getElementById('timeoutRetryBtn');
    const timeoutNextBtn = document.getElementById('timeoutNextBtn');
    
    // CORRIGINDO PROBLEMA: Garantir que o overlay esteja oculto inicialmente
    if (feedbackOverlay) {
        feedbackOverlay.style.display = 'none';
        console.log("%c[Quiz Anatomia] Overlay de feedback ocultado inicialmente", "color: #b4fc00;");
    }
    
    // Verificar se os popups de feedback existem e ocultá-los inicialmente
    if (correctFeedbackPopup) correctFeedbackPopup.classList.remove('show');
    if (incorrectFeedbackPopup) incorrectFeedbackPopup.classList.remove('show');
    if (timeoutFeedbackPopup) timeoutFeedbackPopup.classList.remove('show');
    
    // Variáveis de estado
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let timer;
    let timeLeft = 30;
    
    // Verificações críticas e debug
    if (!welcomeScreen) console.error("[Quiz Anatomia] Elemento não encontrado: welcome-screen");
    if (!quizContainer) console.error("[Quiz Anatomia] Elemento não encontrado: quiz-container");
    if (!startButton) console.error("[Quiz Anatomia] Elemento não encontrado: start-button");
    
    // Verificação das perguntas
    console.log("%c[Quiz Anatomia] Verificando array de perguntas...", "color: #b4fc00;");
    try {
        if (typeof questions === 'undefined') {
            throw new Error("Array 'questions' não está definido. Verifique se o arquivo questions.js está carregado corretamente.");
        }
        
        if (!Array.isArray(questions)) {
            throw new Error("'questions' não é um array válido");
        }
        
        if (questions.length === 0) {
            throw new Error("Array 'questions' está vazio");
        }
        
        // Verificar estrutura das perguntas
        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.question || !Array.isArray(q.options) || q.options.length < 2 || 
                typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.options.length) {
                throw new Error(`Pergunta ${i+1} tem formato inválido`);
            }
        }
        
        console.log(`%c[Quiz Anatomia] √ ${questions.length} perguntas carregadas com sucesso`, "color: #b4fc00; font-weight: bold;");
    } catch (error) {
        console.error(`[Quiz Anatomia] ERRO: ${error.message}`);
        alert(`Erro ao carregar perguntas: ${error.message}`);
        return;
    }
    
    // Inicialização de eventos
    if (startButton) {
        console.log("%c[Quiz Anatomia] Configurando evento do botão de início", "color: #b4fc00;");
        startButton.addEventListener('click', function(e) {
            console.log("%c[Quiz Anatomia] Botão de início clicado!", "color: #b4fc00; font-weight: bold;");
            e.preventDefault(); // Previne comportamento padrão
            startQuiz();
        });
    }
    
    // Configurar botões de feedback
    if (correctNextBtn) {
        correctNextBtn.addEventListener('click', function() {
            correctFeedbackPopup.classList.remove('show');
            feedbackOverlay.style.display = 'none';
            goToNextQuestion();
        });
    }
    
    if (incorrectNextBtn) {
        incorrectNextBtn.addEventListener('click', function() {
            incorrectFeedbackPopup.classList.remove('show');
            feedbackOverlay.style.display = 'none';
            goToNextQuestion();
        });
    }
    
    if (timeoutRetryBtn) {
        timeoutRetryBtn.addEventListener('click', function() {
            timeoutFeedbackPopup.classList.remove('show');
            feedbackOverlay.style.display = 'none';
            startTimer();
        });
    }
    
    if (timeoutNextBtn) {
        timeoutNextBtn.addEventListener('click', function() {
            timeoutFeedbackPopup.classList.remove('show');
            feedbackOverlay.style.display = 'none';
            goToNextQuestion();
        });
    }
    
    // Funções principais
    function startQuiz() {
        console.log("%c[Quiz Anatomia] Iniciando o quiz", "color: #b4fc00; font-weight: bold;");
        
        try {
            // Mostrar o contêiner do quiz e esconder a tela de boas-vindas
            if (welcomeScreen) welcomeScreen.style.display = 'none';
            if (quizContainer) quizContainer.style.display = 'block';
            if (formContainer) formContainer.style.display = 'none';
            if (resultsContainer) resultsContainer.style.display = 'none';
            
            // GARANTIR que o overlay esteja oculto
            if (feedbackOverlay) feedbackOverlay.style.display = 'none';
            
            // Resetar o estado do quiz
            currentQuestionIndex = 0;
            score = 0;
            selectedOption = null;
            
            // Carregar a primeira pergunta
            loadQuestion(0);
            console.log("%c[Quiz Anatomia] Quiz iniciado com sucesso", "color: #b4fc00; font-weight: bold;");
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao iniciar quiz: ${error.message}`);
            alert("Erro ao iniciar o quiz. Verifique o console para detalhes.");
        }
    }
    
    function loadQuestion(index) {
        console.log(`%c[Quiz Anatomia] Carregando pergunta ${index + 1}/${questions.length}`, "color: #b4fc00;");
        
        try {
            // Validar o índice
            if (index < 0 || index >= questions.length) {
                throw new Error(`Índice de pergunta inválido: ${index}`);
            }
            
            // Obter a pergunta atual
            const question = questions[index];
            currentQuestionIndex = index;
            selectedOption = null;
            
            // Atualizar a interface
            if (questionNumber) {
                questionNumber.textContent = `Pergunta ${index + 1}/${questions.length}`;
            }
            
            if (progressBar) {
                progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
            }
            
            if (questionText) {
                questionText.textContent = question.question;
            }
            
            // Criar as opções
            if (optionsContainer) {
                optionsContainer.innerHTML = '';
                
                question.options.forEach((option, i) => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'option';
                    optionElement.innerHTML = `
                        <span class="option-prefix">${String.fromCharCode(65 + i)}</span>
                        <span class="option-text">${option}</span>
                    `;
                    
                    optionElement.addEventListener('click', function() {
                        selectOption(optionElement, i);
                    });
                    
                    optionsContainer.appendChild(optionElement);
                });
            }
            
            // Configurar o botão de próxima
            if (nextButton) {
                nextButton.disabled = true;
                nextButton.onclick = goToNextQuestion;
            }
            
            // Iniciar o temporizador
            startTimer();
            console.log(`%c[Quiz Anatomia] Pergunta ${index + 1} carregada com sucesso`, "color: #b4fc00;");
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao carregar pergunta: ${error.message}`);
        }
    }
    
    function selectOption(optionElement, optionIndex) {
        console.log(`%c[Quiz Anatomia] Opção ${optionIndex + 1} selecionada`, "color: #b4fc00;");
        
        try {
            // Evitar seleção múltipla
            if (selectedOption !== null) return;
            
            // Parar o temporizador
            clearInterval(timer);
            
            // Atualizar a opção selecionada
            selectedOption = optionIndex;
            const currentQuestion = questions[currentQuestionIndex];
            const isCorrect = selectedOption === currentQuestion.answer;
            
            // Atualizar a interface
            if (isCorrect) {
                optionElement.classList.add('correct');
                score++;
                showCorrectFeedback(currentQuestion.explanation);
            } else {
                optionElement.classList.add('incorrect');
                
                // Destacar a resposta correta
                const options = optionsContainer.querySelectorAll('.option');
                if (options.length > currentQuestion.answer) {
                    options[currentQuestion.answer].classList.add('correct');
                }
                
                showIncorrectFeedback(currentQuestion.explanation, currentQuestion.options[currentQuestion.answer]);
            }
            
            // Desabilitar todas as opções
            const options = optionsContainer.querySelectorAll('.option');
            options.forEach(opt => {
                opt.classList.add('disabled');
            });
            
            // Habilitar o botão de próxima
            if (nextButton) {
                nextButton.disabled = false;
            }
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao selecionar opção: ${error.message}`);
        }
    }
    
    function goToNextQuestion() {
        console.log("%c[Quiz Anatomia] Avançando para a próxima pergunta", "color: #b4fc00;");
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            showForm();
        }
    }
    
    function showForm() {
        console.log("%c[Quiz Anatomia] Exibindo formulário", "color: #b4fc00;");
        
        try {
            quizContainer.style.display = 'none';
            formContainer.style.display = 'block';
            
            // Configurar formulário para envio
            const userForm = document.getElementById('user-form');
            if (userForm) {
                // Remover listeners existentes para evitar duplicação
                const newForm = userForm.cloneNode(true);
                userForm.parentNode.replaceChild(newForm, userForm);
                
                newForm.addEventListener('submit', function(event) {
                    event.preventDefault();
                    showResults();
                });
            }
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao exibir formulário: ${error.message}`);
        }
    }
    
    function showResults() {
        console.log("%c[Quiz Anatomia] Exibindo resultados", "color: #b4fc00;");
        
        try {
            formContainer.style.display = 'none';
            resultsContainer.style.display = 'block';
            
            // Calcula a porcentagem para o círculo de progresso
            const scorePercent = (score / questions.length) * 100;
            const scoreProgressCircle = document.getElementById('score-progress');
            const scoreValue = document.getElementById('score-value');
            const scoreMessage = document.getElementById('score-message');
            const resultLevel = document.getElementById('result-level');
            const scoreBadge = document.getElementById('score-badge');
            const courseTagline = document.getElementById('course-tagline');
            const bannerPersonalized = document.getElementById('banner-personalized');
            const finalMessage = document.getElementById('final-message');
            
            // Atualiza o valor da pontuação com animação
            let currentScore = 0;
            const scoreAnimation = setInterval(() => {
                if (currentScore === score) {
                    clearInterval(scoreAnimation);
                } else {
                    currentScore++;
                    scoreValue.textContent = currentScore;
                }
            }, 100);
            
            // Configura o círculo de progresso SVG
            if (scoreProgressCircle) {
                const circumference = 2 * Math.PI * 45; // r=45
                scoreProgressCircle.style.strokeDasharray = circumference;
                
                // Anima o preenchimento do círculo
                setTimeout(() => {
                    const offset = circumference - (scorePercent / 100) * circumference;
                    scoreProgressCircle.style.strokeDashoffset = offset;
                }, 200);
            }
            
            // Define mensagens condicionais com base na pontuação
            let levelMessage, badgeText, taglineText, personalizedText, finalCta;
            
            if (score <= 3) {
                // Nível Iniciante (0-3 acertos)
                levelMessage = "Iniciante em Anatomia";
                badgeText = "NÍVEL BÁSICO";
                taglineText = "Do zero à proficiência em apenas 8 semanas";
                personalizedText = "Seus resultados mostram que você está começando sua jornada na anatomia. O curso Anatomia sem Medo foi criado especialmente para quem está nos primeiros passos!";
                finalCta = "Pare de se sentir perdido nos estudos de anatomia. É hora de construir uma base sólida!";
                
                // Cor do círculo para nível básico (vermelho suave)
                if (scoreProgressCircle) {
                    scoreProgressCircle.style.stroke = "rgba(255, 94, 125, 0.9)";
                }
                
            } else if (score <= 6) {
                // Nível Intermediário (4-6 acertos)
                levelMessage = "Conhecedor de Anatomia";
                badgeText = "NÍVEL INTERMEDIÁRIO";
                taglineText = "Aprofunde seu conhecimento e elimine suas dúvidas";
                personalizedText = "Você já tem uma boa base em anatomia! O curso Anatomia sem Medo vai ajudar você a preencher as lacunas e dominar conceitos mais avançados.";
                finalCta = "Transforme seu conhecimento parcial em domínio completo da anatomia humana!";
                
                // Cor do círculo para nível intermediário (amarelo)
                if (scoreProgressCircle) {
                    scoreProgressCircle.style.stroke = "rgba(255, 184, 108, 0.9)";
                }
                
            } else {
                // Nível Avançado (7-10 acertos)
                levelMessage = "Especialista em Anatomia";
                badgeText = "NÍVEL AVANÇADO";
                taglineText = "Domine técnicas avançadas e torne-se referência";
                personalizedText = "Impressionante! Seus resultados mostram um excelente conhecimento. O curso Anatomia sem Medo vai ajudar você a se tornar um verdadeiro especialista com técnicas avançadas.";
                finalCta = "Eleve seu conhecimento ao próximo nível e torne-se uma referência em anatomia!";
                
                // Cor do círculo para nível avançado (verde)
                if (scoreProgressCircle) {
                    scoreProgressCircle.style.stroke = "var(--primary-color)";
                }
            }
            
            // Atualiza os elementos na página com as mensagens condicionais
            if (scoreMessage) scoreMessage.textContent = `Você acertou ${score} de ${questions.length} questões.`;
            if (resultLevel) resultLevel.textContent = levelMessage;
            if (scoreBadge) scoreBadge.textContent = badgeText;
            if (courseTagline) courseTagline.textContent = taglineText;
            if (bannerPersonalized) bannerPersonalized.textContent = personalizedText;
            if (finalMessage) finalMessage.textContent = finalCta;
            
            // Iniciar o cronômetro regressivo
            startCountdown();
            
            // Inicializar os toggles do FAQ
            initFaqToggles();
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao exibir resultados: ${error.message}`);
        }
    }
    
    function initFaqToggles() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alterna o estado do item atual
                item.classList.toggle('active');
            });
        });
    }
    
    function startCountdown() {
        // Define o tempo para 24 horas (pode ser ajustado conforme necessário)
        let hoursLeft = 24;
        let minutesLeft = 0;
        let secondsLeft = 0;
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!hoursEl || !minutesEl || !secondsEl) return;
        
        // Atualiza o cronômetro a cada segundo
        const countdownInterval = setInterval(() => {
            if (secondsLeft > 0) {
                secondsLeft--;
            } else {
                secondsLeft = 59;
                
                if (minutesLeft > 0) {
                    minutesLeft--;
                } else {
                    minutesLeft = 59;
                    
                    if (hoursLeft > 0) {
                        hoursLeft--;
                    } else {
                        // Tempo esgotado
                        clearInterval(countdownInterval);
                        return;
                    }
                }
            }
            
            // Atualiza os elementos com os valores formatados
            hoursEl.textContent = hoursLeft.toString().padStart(2, '0');
            minutesEl.textContent = minutesLeft.toString().padStart(2, '0');
            secondsEl.textContent = secondsLeft.toString().padStart(2, '0');
        }, 1000);
    }
    
    // Configurações do timer de contagem regressiva para o quiz
    let timerInterval;
    const TIME_LIMIT = 30; // segundos
    const WARNING_THRESHOLD = 10; // começar a avisar quando faltar 10 segundos
    const ALERT_THRESHOLD = 5; // alerta mais intenso quando faltar 5 segundos

    // Cores seguindo o tema verde neon (#b4fc00)
    const COLOR_CODES = {
        primary: {
            color: "var(--primary-color)" // Verde neon
        },
        warning: {
            color: "#ffdd00", // Amarelo
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "#ff4d4d", // Vermelho
            threshold: ALERT_THRESHOLD
        }
    };

    // Inicia o temporizador da pergunta
    function startTimer() {
        timeLeft = 30;
        let timePassed = 0;
        
        // Reseta o valor do timer
        const timerElement = document.getElementById('timer');
        const timerPathRemaining = document.getElementById('timer-path-remaining');
        
        if (!timerElement) {
            console.error("Elemento do timer não encontrado");
            return;
        }
        
        // Configura o círculo SVG se existir
        if (timerPathRemaining) {
            const circumference = 2 * Math.PI * 45; // r=45
            timerPathRemaining.style.strokeDasharray = circumference;
            timerPathRemaining.style.strokeDashoffset = 0;
            timerPathRemaining.style.stroke = COLOR_CODES.primary.color;
        }
        
        // Remove qualquer animação de aviso anterior
        timerElement.style.animation = 'none';
        timerElement.style.color = COLOR_CODES.primary.color;
        
        // Atualiza o texto do timer
        timerElement.textContent = timeLeft;
        
        // Limpa qualquer intervalo de timer antigo
        clearInterval(timer);
        
        // Inicia um novo intervalo de timer
        timer = setInterval(function() {
            timePassed += 1;
            timeLeft = TIME_LIMIT - timePassed;
            
            // Atualiza o texto do timer
            timerElement.textContent = timeLeft;
            
            // Atualiza o círculo SVG se existir
            if (timerPathRemaining) {
                const timeLeftFraction = timeLeft / TIME_LIMIT;
                const circumference = 2 * Math.PI * 45; // r=45
                const offset = circumference - (timeLeftFraction * circumference);
                timerPathRemaining.style.strokeDashoffset = offset;
            }
            
            // Lógica para aviso de tempo acabando
            if (timeLeft <= COLOR_CODES.alert.threshold) {
                // Alerta vermelho
                if (timerPathRemaining) {
                    timerPathRemaining.style.stroke = COLOR_CODES.alert.color;
                }
                timerElement.style.color = COLOR_CODES.alert.color;
                timerElement.style.animation = 'timer-warning 0.5s infinite';
            } else if (timeLeft <= COLOR_CODES.warning.threshold) {
                // Aviso amarelo
                if (timerPathRemaining) {
                    timerPathRemaining.style.stroke = COLOR_CODES.warning.color;
                }
                timerElement.style.color = COLOR_CODES.warning.color;
                timerElement.style.animation = 'timer-warning 1s infinite';
            }
            
            // Verifica se o tempo acabou
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 1000);
    }

    function handleTimeOut() {
        console.log("%c[Quiz Anatomia] Tempo esgotado", "color: #b4fc00;");
        
        try {
            // Pausa o timer
            clearInterval(timer);
            
            // Mostra o overlay de tempo esgotado
            const timeoutOverlay = document.getElementById('timeout-overlay');
            if (timeoutOverlay) {
                timeoutOverlay.style.display = 'flex';
                
                // Adiciona eventos aos botões
                const tryAgainBtn = document.getElementById('try-again-btn');
                const skipBtn = document.getElementById('skip-btn');
                
                if (tryAgainBtn) {
                    tryAgainBtn.addEventListener('click', function() {
                        timeoutOverlay.style.display = 'none';
                        startTimer();
                        hasInteracted = false; // Reseta a flag de interação
                    });
                }
                
                if (skipBtn) {
                    skipBtn.addEventListener('click', function() {
                        timeoutOverlay.style.display = 'none';
                        consecutiveTimeouts++;
                        
                        if (consecutiveTimeouts >= 2) {
                            showInactivityPopup();
                        } else {
                            goToNextQuestion();
                        }
                    });
                }
            } else {
                console.error("Elemento 'timeout-overlay' não encontrado no DOM");
            }
            
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao lidar com o timeout: ${error.message}`);
        }
    }
    
    function showCorrectFeedback(explanation) {
        console.log("%c[Quiz Anatomia] Mostrando feedback - Resposta CORRETA", "color: #b4fc00;");
        
        try {
            if (correctFeedbackPopup && feedbackOverlay && correctFeedbackMessage) {
                feedbackOverlay.style.display = 'block';
                correctFeedbackMessage.textContent = explanation || "Parabéns! Você acertou esta questão.";
                correctFeedbackPopup.classList.add('show');
                
                // Animação da barra de progresso
                const correctProgressBar = document.getElementById('correctProgressBar');
                if (correctProgressBar) {
                    setTimeout(() => {
                        correctProgressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
                    }, 300);
                }
                
                // Criar partículas de efeito
                createParticles(document.getElementById('correctParticles'), 20, true);
            } else {
                console.warn("[Quiz Anatomia] Elementos de feedback correto não encontrados");
                setTimeout(goToNextQuestion, 1500); // Fallback simples
            }
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao mostrar feedback correto: ${error.message}`);
            setTimeout(goToNextQuestion, 1500); // Fallback em caso de erro
        }
    }
    
    function showIncorrectFeedback(explanation, correctAnswer) {
        console.log("%c[Quiz Anatomia] Mostrando feedback - Resposta INCORRETA", "color: #b4fc00;");
        
        try {
            if (incorrectFeedbackPopup && feedbackOverlay && incorrectFeedbackMessage && correctAnswerText) {
                feedbackOverlay.style.display = 'block';
                correctAnswerText.textContent = correctAnswer;
                incorrectFeedbackMessage.innerHTML = `A resposta correta era: <strong>${correctAnswer}</strong>`;
                incorrectFeedbackPopup.classList.add('show');
                
                // Criar partículas de efeito
                createParticles(document.getElementById('incorrectParticles'), 15, false);
            } else {
                console.warn("[Quiz Anatomia] Elementos de feedback incorreto não encontrados");
                setTimeout(goToNextQuestion, 1500); // Fallback simples
            }
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao mostrar feedback incorreto: ${error.message}`);
            setTimeout(goToNextQuestion, 1500); // Fallback em caso de erro
        }
    }
    
    function createParticles(container, count, isCorrect) {
        if (!container) return;
        
        try {
            container.innerHTML = '';
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.classList.add('feedback-particle');
                
                // Posição aleatória
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 3;
                const size = Math.random() * 8 + 3;
                
                particle.style.left = `${x}%`;
                particle.style.bottom = `${y}%`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.animationDelay = `${delay}s`;
                
                container.appendChild(particle);
            }
        } catch (error) {
            console.error(`[Quiz Anatomia] Erro ao criar partículas: ${error.message}`);
        }
    }
    
    // Tratamento global de erros
    window.onerror = function(message, source, lineno, colno, error) {
        console.error(`[Quiz Anatomia] Erro JavaScript: ${message} em ${source}:${lineno}:${colno}`);
        console.error(error && error.stack ? error.stack : "Sem stack trace disponível");
        return true;
    };
});
