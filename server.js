const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Precisamos do axios para consultar o CEP

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calcular-frete', async (req, res) => {
    const { cepDestino } = req.body;
    const { items } = req.body; // Caso queira usar no futuro
    const cepLimpo = cepDestino.replace(/\D/g, '');

    console.log(`🔍 Buscando localização para o CEP: ${cepLimpo}`);

    try {
        // Consultamos a ViaCEP (que é super rápida e não cai)
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const localizacao = response.data;

        if (localizacao.erro) {
            return res.status(400).json({ error: "CEP não encontrado" });
        }

        // --- SUA TABELA DE FRETE PROFISSIONAL ---
        let valorFrete = 35.00; // Valor padrão para longe
        let prazo = "10 a 15";

        const estado = localizacao.uf; // Ex: SP, PE, RJ...

        if (estado === 'SP') { 
            valorFrete = 12.00; 
            prazo = "2 a 5";
        } else if (['RJ', 'MG', 'ES'].includes(estado)) {
            valorFrete = 22.00;
            prazo = "5 a 8";
        } else if (['PE', 'BA', 'CE'].includes(estado)) {
            valorFrete = 28.00;
            prazo = "7 a 10";
        }

        console.log(`✅ Frete para ${estado} (${localizacao.localidade}) calculado: R$ ${valorFrete}`);

        // DEVOLVEMOS OS DADOS (Mantendo seu formato de Array e adicionando a Cidade no index 2)
        res.json([
            {}, // Index 0 (PAC)
            {   // Index 1 (SEDEX)
                Valor: valorFrete.toFixed(2).replace('.', ','),
                PrazoEntrega: prazo,
                Erro: "0"
            },
            {   // Index 2 (DADOS EXTRAS DA CIDADE - NOVIDADE)
                cidade: localizacao.localidade,
                uf: localizacao.uf,
                rua: localizacao.logradouro || ""
            }
        ]);

    } catch (error) {
        res.status(500).json({ error: "Erro ao consultar localização" });
    }
});

app.listen(3000, () => console.log('🚀 SERVIDOR ANAUÁ BLINDADO ONLINE!'));
