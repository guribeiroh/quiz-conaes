// Perguntas do quiz com detalhes para avaliação de conhecimento em anatomia clínica
const questions = [
    {
        id: 1,
        question: "Qual é o maior órgão interno do corpo humano?",
        options: ["Coração", "Pulmão", "Fígado", "Rim"],
        correct: 2,
        difficulty: "easy",
        correctFeedback: "✅ Correto! O fígado é o maior órgão interno do corpo humano, pesando cerca de 1,5kg em um adulto médio. Ele desempenha mais de 500 funções vitais, incluindo desintoxicação, metabolismo e produção de proteínas.",
        incorrectFeedback: "❌ Incorreto. O fígado é o maior órgão interno do corpo humano. Este conhecimento básico é fundamental para diagnósticos precisos em diversas especialidades médicas."
    },
    {
        id: 2,
        question: "A \"patela\" é o osso conhecido popularmente como:",
        options: ["Cotovelo", "Joelho", "Calcanhar", "Tornozelo"],
        correct: 1,
        difficulty: "easy",
        correctFeedback: "✅ Correto! A patela é o osso sesamoide localizado anteriormente à articulação do joelho. Ela protege a articulação e aumenta a eficiência mecânica do músculo quadríceps femoral.",
        incorrectFeedback: "❌ Incorreto. A patela é o osso popularmente conhecido como joelho (mais precisamente, é o osso da frente do joelho). Este tipo de conhecimento anatômico básico é essencial para qualquer profissional de saúde."
    },
    {
        id: 3,
        question: "Qual estrutura produz o líquido cefalorraquidiano (LCR)?",
        options: ["Plexo braquial", "Plexo coroide", "Corpo caloso", "Gânglios da base"],
        correct: 1,
        difficulty: "medium",
        correctFeedback: "✅ Excelente! O plexo coroide é responsável pela produção do LCR, que circula nos ventrículos cerebrais e no espaço subaracnóideo, protegendo o SNC contra choques e transportando nutrientes.",
        incorrectFeedback: "❌ Incorreto. O plexo coroide é a estrutura responsável pela produção do LCR. Este conhecimento é fundamental em neuroanatomia e frequentemente avaliado em provas de residência."
    },
    {
        id: 4,
        question: "Qual nervo frequentemente lesionado em fraturas do colo cirúrgico do úmero?",
        options: ["Axilar", "Mediano", "Ulnar", "Radial"],
        correct: 0,
        difficulty: "medium",
        correctFeedback: "✅ Correto! O nervo axilar (circunflexo) é comumente lesionado neste tipo de fratura, podendo causar déficit na abdução do braço e atrofia do músculo deltoide.",
        incorrectFeedback: "❌ Incorreto. O nervo axilar é frequentemente lesionado em fraturas do colo cirúrgico do úmero. Reconhecer esse risco é crucial para ortopedistas e fisioterapeutas no manejo dessas lesões."
    },
    {
        id: 5,
        question: "O músculo responsável pelos primeiros 15° de abdução do braço é o:",
        options: ["Deltoide", "Supraespinal", "Infraespinal", "Subescapular"],
        correct: 1,
        difficulty: "medium",
        correctFeedback: "✅ Perfeito! O músculo supraespinal inicia a abdução do braço (0-15°), enquanto o deltoide assume a função principal após esse ponto. Esta distinção é crucial para avaliações clínicas precisas.",
        incorrectFeedback: "❌ Incorreto. O músculo supraespinal é responsável pelos primeiros 15° de abdução do braço. Este detalhe é fundamental para diagnósticos precisos de lesões do manguito rotador."
    },
    {
        id: 6,
        question: "Durante uma tireoidectomia, qual nervo lesionado causa rouquidão permanente?",
        options: ["Laríngeo recorrente", "Frênico", "Hipoglosso", "Vago superior"],
        correct: 0,
        difficulty: "hard",
        correctFeedback: "✅ Excelente! O nervo laríngeo recorrente inerva a maioria dos músculos intrínsecos da laringe. Sua lesão causa paralisia das cordas vocais, resultando em rouquidão permanente.",
        incorrectFeedback: "❌ Incorreto. O nervo laríngeo recorrente, quando lesionado durante uma tireoidectomia, causa rouquidão permanente devido à paralisia das cordas vocais. Este conhecimento é crucial para cirurgiões."
    },
    {
        id: 7,
        question: "A Síndrome do Túnel do Carpo ocorre devido à compressão de qual nervo?",
        options: ["Ulnar", "Radial", "Mediano", "Musculocutâneo"],
        correct: 2,
        difficulty: "hard",
        correctFeedback: "✅ Correto! A compressão do nervo mediano no túnel do carpo causa parestesia e fraqueza na região tenar, afetando principalmente o polegar, indicador e dedo médio.",
        incorrectFeedback: "❌ Incorreto. A Síndrome do Túnel do Carpo ocorre devido à compressão do nervo mediano. Este conhecimento é essencial para o diagnóstico correto de uma das neuropatias compressivas mais comuns."
    },
    {
        id: 8,
        question: "Qual artéria é normalmente palpada ao verificar o pulso radial?",
        options: ["Artéria radial", "Artéria braquial", "Artéria femoral", "Artéria ulnar"],
        correct: 0,
        difficulty: "hard",
        correctFeedback: "✅ Perfeito! A artéria radial é palpada na região lateral do punho, sendo um ponto essencial para avaliação da circulação periférica e monitoramento dos sinais vitais.",
        incorrectFeedback: "❌ Incorreto. A artéria radial é a que palpamos ao verificar o pulso radial. Este conhecimento básico é fundamental para qualquer exame físico adequado."
    }
];

export default questions; 