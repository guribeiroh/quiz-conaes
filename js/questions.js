/**
 * Banco de perguntas para o Quiz de Anatomia
 * Cada questão contém:
 * - question: o texto da pergunta
 * - options: um array com quatro opções de resposta
 * - answer: o índice (0-3) da resposta correta
 * - explanation: explicação sobre a resposta correta (mostrada nos resultados)
 * - category: categoria da pergunta (sistema anatômico)
 */
const questions = [
    {
        question: "Qual é o maior órgão do corpo humano?",
        options: ["Fígado", "Cérebro", "Pele", "Intestino Grosso"],
        answer: 2,
        explanation: "A pele é o maior órgão do corpo humano, cobrindo uma área de aproximadamente 2 metros quadrados em um adulto médio e representando cerca de 15% do peso corporal total.",
        category: "geral"
    },
    {
        question: "Quantos ossos tem o corpo humano adulto?",
        options: ["206", "300", "186", "230"],
        answer: 0,
        explanation: "O esqueleto humano adulto é composto por 206 ossos. Curiosamente, nascemos com aproximadamente 300 ossos, mas alguns se fundem durante o crescimento.",
        category: "sistema_osseo"
    },
    {
        question: "Qual é o músculo mais forte do corpo humano em relação ao seu tamanho?",
        options: ["Bíceps", "Músculo Masseter (mandíbula)", "Coração", "Quadríceps"],
        answer: 1,
        explanation: "O masseter, músculo da mandíbula usado para mastigar, é considerado o músculo mais forte em relação ao seu tamanho, podendo exercer uma força de até 90 kg nos molares.",
        category: "sistema_muscular"
    },
    {
        question: "Qual parte do cérebro é responsável pelo equilíbrio e coordenação motora?",
        options: ["Cerebelo", "Lobo frontal", "Hipotálamo", "Medula espinhal"],
        answer: 0,
        explanation: "O cerebelo, localizado na parte posterior do cérebro, é responsável pela coordenação dos movimentos musculares, postura e equilíbrio.",
        category: "sistema_nervoso"
    },
    {
        question: "Qual é a função principal dos glóbulos vermelhos?",
        options: ["Combater infecções", "Transportar oxigênio", "Coagular o sangue", "Produzir anticorpos"],
        answer: 1,
        explanation: "Os glóbulos vermelhos (eritrócitos) são responsáveis pelo transporte de oxigênio dos pulmões para os tecidos do corpo e pela remoção parcial do dióxido de carbono.",
        category: "sistema_circulatorio"
    },
    {
        question: "Qual é o menor osso do corpo humano?",
        options: ["Martelo", "Estribo", "Bigorna", "Falange distal"],
        answer: 1,
        explanation: "O estribo, um dos três ossículos do ouvido médio, é o menor osso do corpo humano, medindo apenas cerca de 2,8 mm.",
        category: "sistema_osseo"
    },
    {
        question: "Qual destes órgãos faz parte do sistema linfático?",
        options: ["Baço", "Pâncreas", "Fígado", "Vesícula biliar"],
        answer: 0,
        explanation: "O baço é um órgão importante do sistema linfático que atua como filtro para o sangue, removendo células velhas e participando na resposta imunológica.",
        category: "sistema_circulatorio"
    },
    {
        question: "Em qual parte do sistema digestivo a maior parte da absorção de nutrientes ocorre?",
        options: ["Estômago", "Intestino grosso", "Intestino delgado", "Esôfago"],
        answer: 2,
        explanation: "O intestino delgado é o principal local de digestão e absorção de nutrientes, com seus aproximadamente 6 metros de comprimento e superfície aumentada pelas vilosidades e microvilosidades.",
        category: "sistema_digestivo"
    },
    {
        question: "Qual é a principal função dos rins?",
        options: ["Produção de insulina", "Digestão de gorduras", "Filtração do sangue", "Armazenamento de glicogênio"],
        answer: 2,
        explanation: "Os rins são responsáveis pela filtração do sangue, removendo resíduos e excesso de água para formar a urina, além de regular o equilíbrio eletrolítico e ácido-base do corpo.",
        category: "geral"
    },
    {
        question: "Qual é a estrutura que separa o coração em lados direito e esquerdo?",
        options: ["Válvula tricúspide", "Septo cardíaco", "Pericárdio", "Miocárdio"],
        answer: 1,
        explanation: "O septo cardíaco é a parede que divide o coração em lados direito e esquerdo, separando o sangue rico em oxigênio do sangue pobre em oxigênio.",
        category: "sistema_circulatorio"
    }
];
