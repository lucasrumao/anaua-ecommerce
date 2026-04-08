// O nosso Banco de Dados Front-end
const bancoDeProdutos = {
    // Produto 1
    "sabonete-andiroba": {
        nome: "Sabonete Facial de Andiroba e Argila Branca",
        subtitulo: "Limpeza suave com efeito calmante",
        precoAntigo: "R$ 99,00",
        precoAtual: "R$ 79,00",
        desconto: "-20% off",
        parcelas: "ou 4x de R$ 19,75 sem juros",
        estoque: 0, // Produto esgotado
        imagens: [
            "assets/img/sabonete.png",
            "assets/img/oleo.png",
            "assets/img/sabonete.png"
        ],
        video: "assets/video/produto-2.mp4",
        capaVideo: "assets/img/capa-video.png",
        historia: "<p>Purificante, delicado e equilibrante, este sabonete facial combina os poderes da andiroba amazônica com a suavidade da argila branca para uma limpeza profunda sem agredir a pele.</p><p>Com textura cremosa e toque sedoso, remove impurezas, excesso de oleosidade e toxinas, enquanto hidrata suavemente e acalma a pele sensível ou reativa. Ideal para uso diário, proporciona frescor, luminosidade e equilíbrio desde a primeira aplicação.</p>",
       
       
        beneficios: "<p>🧴 <strong>Limpeza Suave e Eficiente:</strong> Elimina impurezas e oleosidade sem ressecar, preservando a barreira natural da pele.</p>" +
            "<p>🌿 <strong>Ação Calmante e Desintoxicante:</strong> A andiroba possui propriedades anti-inflamatórias e regeneradoras, enquanto a argila branca purifica e suaviza.</p>" +
            "<p>💧 <strong>Textura Cremosa e Hidratante:</strong> Fórmula equilibrada que desliza facilmente e deixa a pele com sensação de conforto e maciez.</p>" +
            "<p>🌱 <strong>Ideal para Todos os Tipos de Pele:</strong> Especialmente eficaz para peles mistas, sensíveis ou propensas a irritações.</p>" +
            "<p>🍃 <strong>Fragrância Natural e Refrescante:</strong> Aroma suave que desperta os sentidos e eleva o momento do cuidado diário.</p>",

       
        ritual: "<p><strong>Observação:</strong> Aplique sobre o rosto úmido com movimentos circulares. Enxágue abundantemente.</p>"
    },

    // Produto 2
    "tonico-castanha": {
        nome: "Tônico de Chá Verde e Extrato de Castanha",
        subtitulo: "Equilíbrio e frescor para o dia a dia",
        precoAntigo: "", // Deixei vazio propositalmente (sem desconto)
        precoAtual: "R$ 56,00",
        desconto: "",
        parcelas: "ou 2x de R$ 28,00 sem juros",
        imagens: [
            "assets/img/tonico.png" // Só tem 1 foto! Não pode repetir.
        ],
        video: "", // Sem vídeo
        historia: "<p>O tônico perfeito para revitalizar a sua pele logo pela manhã.</p><p>Formulado com extrato de castanha para nutrir e chá verde para proteger.</p>",
        beneficios: "<p>🍃 <strong>Refrescante:</strong> Sensação imediata de limpeza.</p><p>🛡️ <strong>Proteção Antioxidante:</strong> Combate os radicais livres.</p>",
        ritual: "<p><strong>Como usar:</strong> Aplique com um ecopad após a limpeza do rosto. Não precisa enxaguar.</p>"
    },

    // Produto 3
"hidratante-cupuacu": {
    nome: "Hidratante Facial com Manteiga de Cupuaçu e Ácido Hialurônico Vegetal",
    subtitulo: "Hidratação profunda com toque leve e natural",
    precoAntigo: "",
    precoAtual: "R$ 68,00",
    desconto: "",
    parcelas: "ou 4x de R$ 17,00 sem juros",
    imagens: [
        "assets/img/hidratante.png"
    ],
    video: "",
    historia: "<p>Um hidratante que traduz o equilíbrio perfeito entre nutrição e leveza. Formulado com manteiga de cupuaçu e ácido hialurônico vegetal, promove hidratação intensa sem pesar na pele.</p><p>Sua textura suave e de rápida absorção envolve o rosto com conforto imediato, ajudando a restaurar a elasticidade, suavizar linhas finas e manter a pele protegida ao longo do dia.</p>",
    beneficios:
        "<p>💧 <strong>Hidratação Prolongada:</strong> Mantém a pele hidratada por horas.</p>" +
        "<p>🌿 <strong>Nutrição Natural:</strong> Fortalece a barreira cutânea e melhora a elasticidade.</p>" +
        "<p>✨ <strong>Toque Leve:</strong> Absorção rápida sem pesar.</p>" +
        "<p>🌱 <strong>Ácido Hialurônico Vegetal:</strong> Suaviza e melhora a aparência da pele.</p>" +
        "<p>🌸 <strong>Pele Radiante:</strong> Aspecto saudável e iluminado.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique no rosto limpo e seco até completa absorção. Use pela manhã e à noite.</p>"
},

// Produto 4
"mascara-argila": {
    nome: "Máscara de Argila com Óleo de Buriti e Camomila",
    subtitulo: "Detox e luminosidade para peles opacas",
    precoAntigo: "",
    precoAtual: "R$ 59,00",
    desconto: "",
    parcelas: "ou 3x de R$ 19,66 sem juros",
    imagens: [
        "assets/img/mascara.png"
    ],
    video: "",
    historia: "<p>Um cuidado intensivo que purifica, acalma e revitaliza a pele. A combinação da argila com o óleo de buriti e a camomila promove um verdadeiro ritual de renovação.</p><p>Ajuda a remover impurezas, controlar a oleosidade e devolver o viço natural da pele, deixando-a mais uniforme e luminosa.</p>",
    beneficios:
        "<p>🌿 <strong>Ação Detox:</strong> Remove impurezas e toxinas.</p>" +
        "<p>✨ <strong>Iluminação Natural:</strong> Devolve o brilho da pele.</p>" +
        "<p>🌼 <strong>Efeito Calmante:</strong> Reduz vermelhidão.</p>" +
        "<p>🧴 <strong>Controle de Oleosidade:</strong> Equilibra sem ressecar.</p>" +
        "<p>💆‍♀️ <strong>Autocuidado:</strong> Ideal para momentos relaxantes.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique no rosto limpo, deixe agir por 10 a 15 minutos e enxágue. Use 1 a 2 vezes por semana.</p>"
},

// Produto 5
"serum-antioxidante": {
    nome: "Sérum Antioxidante com Vitamina C e Extrato de Açaí",
    subtitulo: "Ilumina, uniformiza e protege a pele",
    precoAntigo: "",
    precoAtual: "R$ 78,00",
    desconto: "",
    parcelas: "ou 4x de R$ 19,50 sem juros",
    imagens: [
        "assets/img/serum.png"
    ],
    video: "",
    historia: "<p>Um sérum leve e poderoso que combate os efeitos do tempo e das agressões externas. Com vitamina C e extrato de açaí, ajuda a uniformizar o tom da pele e promover luminosidade.</p><p>Sua textura fluida é rapidamente absorvida, deixando a pele com aparência mais jovem e energizada.</p>",
    beneficios:
        "<p>✨ <strong>Iluminação:</strong> Pele mais radiante.</p>" +
        "<p>🛡️ <strong>Proteção Antioxidante:</strong> Combate radicais livres.</p>" +
        "<p>🌿 <strong>Ativos Naturais:</strong> Rico em nutrientes.</p>" +
        "<p>💧 <strong>Textura Leve:</strong> Absorve rapidamente.</p>" +
        "<p>🌸 <strong>Uniformização:</strong> Suaviza manchas.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique algumas gotas no rosto limpo antes do hidratante.</p>"
},

// Produto 6
"oleo-pracaxi": {
    nome: "Óleo Facial Multifuncional (Andiroba + Pracaxi)",
    subtitulo: "Nutrição intensa e regeneração",
    precoAntigo: "",
    precoAtual: "R$ 64,00",
    desconto: "",
    parcelas: "ou 4x de R$ 16,00 sem juros",
    imagens: [
        "assets/img/oleo.png"
    ],
    video: "",
    historia: "<p>Um blend poderoso de óleos amazônicos que nutre profundamente e revitaliza a pele. A andiroba atua com propriedades calmantes, enquanto o pracaxi auxilia na regeneração.</p><p>Versátil, pode ser usado sozinho ou combinado com outros produtos para potencializar resultados.</p>",
    beneficios:
        "<p>🌿 <strong>Nutrição Profunda:</strong> Repõe lipídios da pele.</p>" +
        "<p>✨ <strong>Regeneração:</strong> Auxilia na recuperação.</p>" +
        "<p>💧 <strong>Toque Sedoso:</strong> Pele macia e luminosa.</p>" +
        "<p>🌱 <strong>Multifuncional:</strong> Uso no rosto, corpo e cabelo.</p>" +
        "<p>🌸 <strong>Calmante:</strong> Ideal para peles sensíveis.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique algumas gotas no rosto ou misture ao hidratante.</p>"
},

// Produto 7
"protetor-urucum": {
    nome: "Protetor Solar Natural FPS 30 com Óleo de Urucum",
    subtitulo: "Proteção diária com toque natural",
    precoAntigo: "",
    precoAtual: "R$ 74,00",
    desconto: "",
    parcelas: "ou 4x de R$ 18,50 sem juros",
    imagens: [
        "assets/img/protetor-solar.png"
    ],
    video: "",
    historia: "<p>Proteja sua pele enquanto cuida dela. Com óleo de urucum, rico em antioxidantes, ajuda a proteger contra danos solares e poluição.</p><p>Sua textura leve proporciona conforto sem pesar na pele.</p>",
    beneficios:
        "<p>☀️ <strong>Proteção FPS 30:</strong> Contra raios UV.</p>" +
        "<p>🌿 <strong>Antioxidante:</strong> Protege e revitaliza.</p>" +
        "<p>💧 <strong>Textura Leve:</strong> Não oleosa.</p>" +
        "<p>🌱 <strong>Uso Diário:</strong> Ideal para rotina.</p>" +
        "<p>✨ <strong>Pele Saudável:</strong> Previne envelhecimento.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique antes da exposição ao sol e reaplique ao longo do dia.</p>"
},

// Produto 8
"balsamo-murumuru": {
    nome: "Bálsamo Noturno com Manteiga de Murumuru e Lavanda",
    subtitulo: "Reparação profunda durante a noite",
    precoAntigo: "",
    precoAtual: "R$ 62,00",
    desconto: "",
    parcelas: "ou 3x de R$ 20,66 sem juros",
    imagens: [
        "assets/img/balsamo.png", "assets/img/balsamo-2.png", "assets/img/balsamo-3.png",
        "assets/img/balsamo-4.png", "assets/img/balsamo-5.png", "assets/img/balsamo-6.png"
        
    ],
    video: "assets/video/balsamo.mp4",
    historia: "<p>Enquanto você descansa, sua pele se regenera. Este bálsamo combina nutrição intensa com efeito relaxante.</p><p>Ao acordar, a pele está mais macia, equilibrada e revitalizada.</p>",
    beneficios:
        "<p>🌙 <strong>Reparação Noturna:</strong> Atua durante o sono.</p>" +
        "<p>🌿 <strong>Nutrição Intensa:</strong> Hidrata profundamente.</p>" +
        "<p>🌸 <strong>Relaxante:</strong> Lavanda acalma.</p>" +
        "<p>💧 <strong>Pele Renovada:</strong> Mais saudável ao acordar.</p>" +
        "<p>✨ <strong>Conforto:</strong> Sensação de cuidado profundo.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique à noite como último passo da rotina.</p>"
},

// Produto 9
"esfoliante-cafe": {
    nome: "Esfoliante Corporal de Café Verde e Açúcar Mascavo",
    subtitulo: "Renovação e maciez para a pele do corpo",
    precoAntigo: "",
    precoAtual: "R$ 54,00",
    desconto: "",
    parcelas: "ou 3x de R$ 18,00 sem juros",
    imagens: [
        "assets/img/esfoliante.png"
    ],
    video: "",
    historia: "<p>Transforme o banho em um momento de renovação. Este esfoliante combina o poder estimulante do café verde com a ação esfoliante do açúcar mascavo.</p><p>Remove células mortas, melhora a textura da pele e promove uma sensação imediata de maciez e frescor.</p>",
    beneficios:
        "<p>☕ <strong>Esfoliação Natural:</strong> Remove células mortas suavemente.</p>" +
        "<p>✨ <strong>Pele Renovada:</strong> Mais lisa e uniforme.</p>" +
        "<p>🌿 <strong>Estímulo à Circulação:</strong> Revitaliza a pele.</p>" +
        "<p>💧 <strong>Não Resseca:</strong> Mantém a hidratação natural.</p>" +
        "<p>🌸 <strong>Experiência Sensorial:</strong> Aroma envolvente.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique sobre a pele úmida com movimentos circulares e enxágue. Use de 2 a 3 vezes por semana.</p>"
},

// Produto 10
"creme-corporal-castanha": {
    nome: "Creme Corporal de Castanha-do-Pará e Mel de Jataí",
    subtitulo: "Nutrição intensa e conforto diário",
    precoAntigo: "",
    precoAtual: "R$ 66,00",
    desconto: "",
    parcelas: "ou 3x de R$ 22,00 sem juros",
    imagens: [
        "assets/img/creme-corporal.png"
    ],
    video: "",
    historia: "<p>Um creme corporal rico e nutritivo que envolve a pele com suavidade e proteção. A castanha-do-pará oferece nutrição profunda, enquanto o mel de jataí contribui para hidratação e regeneração.</p><p>Ideal para manter a pele macia, hidratada e protegida ao longo do dia.</p>",
    beneficios:
        "<p>🌿 <strong>Nutrição Profunda:</strong> Rico em vitaminas e antioxidantes.</p>" +
        "<p>💧 <strong>Hidratação Duradoura:</strong> Mantém a pele macia por mais tempo.</p>" +
        "<p>🍯 <strong>Regeneração Natural:</strong> Auxilia na recuperação da pele.</p>" +
        "<p>✨ <strong>Toque Aveludado:</strong> Sensação de conforto imediato.</p>" +
        "<p>🌸 <strong>Uso Diário:</strong> Ideal para todos os tipos de pele.</p>",
    ritual: "<p><strong>Como usar:</strong> Aplique no corpo após o banho ou sempre que desejar, massageando até completa absorção.</p>"
},

// Produto 11
"ecobag-anaua": {
    nome: "Ecobag Anauá",
    subtitulo: "Sustentabilidade com estilo natural",
    precoAntigo: "",
    precoAtual: "R$ 29,00",
    desconto: "",
    parcelas: "ou 2x de R$ 14,50 sem juros",
    imagens: [
        "assets/img/ecobag.png"
    ],
    video: "",
    historia: "<p>Uma ecobag prática e resistente, perfeita para acompanhar sua rotina com leveza e consciência ambiental.</p><p>Inspirada na essência da Anauá, une funcionalidade e identidade em um acessório versátil para o dia a dia.</p>",
    beneficios:
        "<p>🌿 <strong>Sustentável:</strong> Reduz o uso de sacolas descartáveis.</p>" +
        "<p>👜 <strong>Versátil:</strong> Ideal para diversas ocasiões.</p>" +
        "<p>✨ <strong>Design Natural:</strong> Combina com qualquer estilo.</p>" +
        "<p>💪 <strong>Resistente:</strong> Suporta peso com segurança.</p>",
    ritual: "<p><strong>Como usar:</strong> Utilize no dia a dia para compras, passeios ou transporte de itens pessoais.</p>"
},

// Produto 12
"sacola-viagem": {
    nome: "Sacola para Viagem Anauá",
    subtitulo: "Organização prática para seus rituais",
    precoAntigo: "",
    precoAtual: "R$ 35,00",
    desconto: "",
    parcelas: "ou 2x de R$ 17,50 sem juros",
    imagens: [
        "assets/img/sacola.png"
    ],
    video: "",
    historia: "<p>Perfeita para levar seus produtos Anauá com segurança e estilo. Compacta e funcional, facilita a organização durante viagens.</p><p>Ideal para quem deseja manter seu ritual de cuidados sempre por perto.</p>",
    beneficios:
        "<p>🧳 <strong>Organização:</strong> Mantém tudo no lugar.</p>" +
        "<p>🌿 <strong>Design Funcional:</strong> Ideal para skincare.</p>" +
        "<p>✨ <strong>Compacta:</strong> Fácil de transportar.</p>" +
        "<p>💧 <strong>Proteção:</strong> Ajuda a evitar vazamentos.</p>",
    ritual: "<p><strong>Como usar:</strong> Utilize para armazenar seus produtos durante viagens ou no cotidiano.</p>"
},

// Produto 13
"kit-anaua": {
    nome: "Kit Anauá (Sabonete + Tônico + Hidratante)",
    subtitulo: "O ritual completo para sua pele",
    precoAntigo: "",
    precoAtual: "R$ 149,00",
    desconto: "",
    parcelas: "ou 4x de R$ 37,25 sem juros",
    imagens: [
        "assets/img/kit-anaua.png"
    ],
    video: "",
    historia: "<p>Um kit essencial que reúne os três passos fundamentais do cuidado facial: limpeza, equilíbrio e hidratação.</p><p>Ideal para quem deseja iniciar ou manter uma rotina completa com ativos naturais brasileiros.</p>",
    beneficios:
        "<p>🌿 <strong>Rotina Completa:</strong> Limpeza, tonificação e hidratação.</p>" +
        "<p>✨ <strong>Resultados Visíveis:</strong> Pele equilibrada e saudável.</p>" +
        "<p>💧 <strong>Praticidade:</strong> Tudo em um só kit.</p>" +
        "<p>🎁 <strong>Ideal para Presentear:</strong> Experiência completa de autocuidado.</p>",
    ritual:
        "<p><strong>Como usar:</strong></p>" +
        "<p>1. Limpe com o sabonete facial</p>" +
        "<p>2. Aplique o tônico</p>" +
        "<p>3. Finalize com o hidratante</p>"
}

};