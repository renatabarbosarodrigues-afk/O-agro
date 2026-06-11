/**
 * script.js — O Agro
 * Lógica do quiz interativo de agricultura sustentável.
 *
 * Responsabilidades:
 *  - Armazenar as perguntas e respostas corretas
 *  - Coletar as respostas do usuário ao clicar em "Enviar respostas"
 *  - Validar as respostas e aplicar feedback visual em cada alternativa
 *  - Exibir uma mensagem de resultado amigável
 *  - Permitir reiniciar o quiz sem recarregar a página
 */

/* ================================================
   GABARITO DAS QUESTÕES
   Cada entrada mapeia o nome do grupo de radio (name)
   para a letra da alternativa correta.
================================================ */
const gabarito = {
  q1: 'b', // Cobertura morta (mulching)
  q2: 'b', // Alternar diferentes culturas em uma mesma área
  q3: 'c', // Agrofloresta (sistema agroflorestal)
};

/* ================================================
   MENSAGENS DE FEEDBACK
   Organizadas por número de acertos (0, 1, 2 ou 3).
================================================ */
const mensagens = {
  0: {
    emoji: '🌱',
    classe: 'result-bad',
    titulo: 'Hora de aprender mais!',
    texto:
      'Você não acertou nenhuma desta vez, mas tudo bem — cada semente precisa de tempo para brotar. Explore o conteúdo acima e tente novamente!',
  },
  1: {
    emoji: '🌾',
    classe: 'result-bad',
    titulo: 'Bom começo!',
    texto:
      'Você acertou 1 de 3. O campo está aberto — continue estudando e sua colheita de conhecimento vai crescer!',
  },
  2: {
    emoji: '🌻',
    classe: 'result-good',
    titulo: 'Quase lá!',
    texto:
      'Você acertou 2 de 3. Está no caminho certo! Um pouquinho mais de atenção e você domina o tema.',
  },
  3: {
    emoji: '🏆',
    classe: 'result-great',
    titulo: 'Parabéns, especialista!',
    texto:
      'Você acertou todas as 3 perguntas! Seu conhecimento sobre agricultura sustentável está florescendo. Continue espalhando essa consciência!',
  },
};

/* ================================================
   REFERÊNCIAS AOS ELEMENTOS DO DOM
   Capturadas uma única vez para melhor desempenho.
================================================ */
const btnEnviar   = document.getElementById('submit-btn');
const areaFeedback = document.getElementById('feedback-area');

/* ================================================
   EVENTO: Clique no botão "Enviar respostas"
================================================ */
btnEnviar.addEventListener('click', function () {
  // 1. Coleta as respostas marcadas pelo usuário
  const respostas = coletarRespostas();

  // 2. Verifica se todas as perguntas foram respondidas
  if (!todasRespondidas(respostas)) {
    mostrarAlerta('⚠️ Por favor, responda todas as perguntas antes de enviar.');
    return;
  }

  // 3. Calcula a pontuação e aplica feedback visual por questão
  const acertos = avaliarRespostas(respostas);

  // 4. Exibe o resultado geral
  mostrarResultado(acertos);

  // 5. Desabilita o botão e os inputs para evitar reenvio
  desabilitarQuiz();
});

/* ================================================
   FUNÇÃO: coletarRespostas
   Retorna um objeto { q1: 'valor', q2: 'valor', q3: 'valor' }
   com as alternativas selecionadas, ou null se não marcadas.
================================================ */
function coletarRespostas() {
  const respostas = {};

  // Itera sobre cada questão definida no gabarito
  Object.keys(gabarito).forEach(function (questao) {
    // Seleciona o radio marcado para esse grupo
    const selecionado = document.querySelector(
      'input[name="' + questao + '"]:checked'
    );
    respostas[questao] = selecionado ? selecionado.value : null;
  });

  return respostas;
}

/* ================================================
   FUNÇÃO: todasRespondidas
   Verifica se nenhum valor do objeto de respostas é null.
================================================ */
function todasRespondidas(respostas) {
  return Object.values(respostas).every(function (v) {
    return v !== null;
  });
}

/* ================================================
   FUNÇÃO: avaliarRespostas
   Compara as respostas do usuário com o gabarito,
   aplica as classes CSS de feedback em cada opção
   e retorna o número de acertos.
================================================ */
function avaliarRespostas(respostas) {
  let acertos = 0;

  Object.keys(gabarito).forEach(function (questao) {
    const respostaUsuario = respostas[questao];
    const respostaCorreta = gabarito[questao];

    // Percorre todos os labels da questão atual
    const labels = document.querySelectorAll(
      'input[name="' + questao + '"]'
    );

    labels.forEach(function (input) {
      const label = input.closest('.option-label');

      if (input.value === respostaCorreta) {
        // Marca a alternativa correta em verde
        label.classList.add('correct');
      } else if (
        input.value === respostaUsuario &&
        respostaUsuario !== respostaCorreta
      ) {
        // Marca a resposta errada do usuário em vermelho
        label.classList.add('wrong');
      }

      // Adiciona classe visual de "desabilitado" ao label
      label.classList.add('disabled');
    });

    // Incrementa acertos se a resposta estiver correta
    if (respostaUsuario === respostaCorreta) {
      acertos++;
    }
  });

  return acertos;
}

/* ================================================
   FUNÇÃO: mostrarResultado
   Exibe a área de feedback com emoji, título,
   texto e botão de "Tentar novamente".
================================================ */
function mostrarResultado(acertos) {
  const info = mensagens[acertos];

  // Monta o HTML do feedback dinamicamente
  areaFeedback.innerHTML =
    '<span class="feedback-emoji">' + info.emoji + '</span>' +
    '<strong>' + info.titulo + '</strong>' +
    '<p>' + info.texto + '</p>' +
    '<button class="retry-btn" id="retry-btn" type="button">Tentar novamente</button>';

  // Define a classe de cor conforme o resultado
  areaFeedback.className = 'feedback-area ' + info.classe;

  // Torna a área visível (remove o atributo hidden)
  areaFeedback.hidden = false;

  // Rola suavemente até o feedback para que o usuário veja
  areaFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Vincula o botão "Tentar novamente" à função de reset
  document.getElementById('retry-btn').addEventListener('click', reiniciarQuiz);
}

/* ================================================
   FUNÇÃO: mostrarAlerta
   Exibe uma mensagem temporária de aviso quando
   o usuário tenta enviar sem responder tudo.
================================================ */
function mostrarAlerta(mensagem) {
  areaFeedback.innerHTML = mensagem;
  areaFeedback.className = 'feedback-area result-bad';
  areaFeedback.hidden = false;

  // Oculta automaticamente após 3 segundos
  setTimeout(function () {
    areaFeedback.hidden = true;
  }, 3000);
}

/* ================================================
   FUNÇÃO: desabilitarQuiz
   Desabilita todos os inputs e o botão de envio
   para evitar que o usuário altere as respostas.
================================================ */
function desabilitarQuiz() {
  // Desabilita todos os radio buttons
  document.querySelectorAll('.option-input').forEach(function (input) {
    input.disabled = true;
  });

  // Desabilita o botão de envio
  btnEnviar.disabled = true;
}

/* ================================================
   FUNÇÃO: reiniciarQuiz
   Reseta o estado visual e lógico do quiz
   sem recarregar a página.
================================================ */
function reiniciarQuiz() {
  // Remove seleção de todos os radio buttons e reabilita
  document.querySelectorAll('.option-input').forEach(function (input) {
    input.checked  = false;
    input.disabled = false;
  });

  // Remove as classes de feedback dos labels
  document.querySelectorAll('.option-label').forEach(function (label) {
    label.classList.remove('correct', 'wrong', 'disabled');
  });

  // Oculta a área de feedback e limpa seu conteúdo
  areaFeedback.hidden    = true;
  areaFeedback.innerHTML = '';
  areaFeedback.className = 'feedback-area';

  // Reabilita o botão de envio
  btnEnviar.disabled = false;

  // Rola de volta ao topo do quiz
  document
    .getElementById('quiz-container')
    .scrollIntoView({ behavior: 'smooth', block: 'start' });
}
