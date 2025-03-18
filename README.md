# Anatomia Sem Medo - Quiz Clínico

Um quiz interativo para testar conhecimentos em anatomia clínica, desenvolvido com JavaScript moderno e boas práticas de desenvolvimento web.

## 🚀 Funcionalidades

- Quiz interativo com 8 questões de anatomia clínica
- Diferentes níveis de dificuldade (fácil, médio, difícil)
- Temporizador para cada questão
- Feedback imediato após cada resposta
- Coleta de dados do usuário
- Resultados personalizados com base no desempenho
- Design responsivo e moderno
- Animações suaves para melhor experiência do usuário

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e flexbox)
- JavaScript (ES6+)
- Font Awesome para ícones
- Arquitetura baseada em componentes

## 📁 Estrutura do Projeto

```
.
├── css/
│   └── styles.css
├── src/
│   ├── components/
│   │   ├── QuestionComponent.js
│   │   ├── FormComponent.js
│   │   └── ResultsComponent.js
│   ├── data/
│   │   └── questions.js
│   ├── services/
│   │   └── quizService.js
│   └── main.js
├── index.html
└── README.md
```

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/anatomia-sem-medo.git
```

2. Navegue até o diretório do projeto:
```bash
cd anatomia-sem-medo
```

3. Inicie um servidor local. Por exemplo, usando Python:
```bash
# Python 3
python -m http.server 8000
```

4. Acesse o projeto em seu navegador:
```
http://localhost:8000
```

## 🎯 Funcionalidades Principais

### Quiz
- Questões com diferentes níveis de dificuldade
- Temporizador de 30 segundos por questão
- Feedback imediato após cada resposta
- Barra de progresso
- Indicador de dificuldade visual

### Formulário
- Validação em tempo real
- Campos obrigatórios
- Validação de e-mail
- Seleção de área de atuação

### Resultados
- Cálculo de pontuação
- Medalhas baseadas no desempenho
- Mensagens personalizadas
- Call-to-action adaptativo
- Barra de progresso animada

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (> 768px)
- Tablet (768px)
- Mobile (< 768px)

## 🎨 Personalização

O projeto utiliza variáveis CSS para fácil personalização de cores e estilos:

```css
:root {
    --primary: #1c1c1c;
    --secondary: #333333;
    --accent: #22a7f0;
    /* ... outras variáveis ... */
}
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

Link do projeto: [https://github.com/seu-usuario/anatomia-sem-medo](https://github.com/seu-usuario/anatomia-sem-medo) 