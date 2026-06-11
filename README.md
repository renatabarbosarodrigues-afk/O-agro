 🌿 O Agro — Agricultura Sustentável

Site educativo sobre agricultura sustentável com quiz interativo, desenvolvido com HTML, CSS e JavaScript puros — sem frameworks ou dependências externas.

---

## 📁 Estrutura do projeto

```
o-agro/
├── index.html   → Estrutura e conteúdo da página
├── style.css    → Estilos visuais e responsividade
├── script.js    → Lógica do quiz interativo
└── README.md    → Este arquivo
```

---

## 🚀 Como usar

Nenhuma instalação necessária. Basta:

1. Baixar ou clonar os arquivos para uma pasta local
2. Abrir o arquivo `index.html` em qualquer navegador moderno

> O site carrega fontes do Google Fonts, então uma conexão com a internet é recomendada para a tipografia completa. O restante funciona 100% offline.

---

## ✨ Funcionalidades

- **Cabeçalho** com título, tagline e animação sutil de folha
- **Seção informativa** sobre o conceito de agricultura sustentável
- **Quiz com 3 perguntas** de múltipla escolha (4 alternativas cada)
- **Feedback visual por alternativa** — verde para certa, vermelho para errada
- **Mensagem de resultado** personalizada conforme o número de acertos
- **Botão "Tentar novamente"** que reseta o quiz sem recarregar a página
- **Validação**: alerta se o usuário tentar enviar sem responder tudo
- **Design responsivo** — funciona bem em desktop e mobile
- **Acessibilidade**: atributos ARIA, navegação por teclado e respeito a `prefers-reduced-motion`

---

## 🎨 Design

| Token         | Valor     | Uso                        |
|---------------|-----------|----------------------------|
| Verde escuro  | `#3A6B35` | Cabeçalho, rodapé, botão   |
| Verde médio   | `#5C8D3A` | Hover, destaques           |
| Verde claro   | `#7AB648` | Bordas de seleção, acerto  |
| Creme         | `#F5F0E8` | Fundo geral                |
| Terra         | `#C8883C` | Sublinhado dos títulos     |
| Texto         | `#2B2B2B` | Corpo do texto             |

**Tipografia:** `Playfair Display` (títulos) + `Inter` (corpo)

---

## 🧩 Gabarito do quiz

| Pergunta | Resposta correta |
|----------|-----------------|
| 1 — Qual prática conserva a umidade do solo? | **B** — Cobertura morta (mulching) |
| 2 — O que é rotação de culturas? | **B** — Alternar diferentes culturas na mesma área |
| 3 — Qual sistema integra árvores, cultivos e animais? | **C** — Agrofloresta |

---

## 🛠️ Tecnologias

- **HTML5** semântico (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** com variáveis customizadas (`--var`), Flexbox e media queries
- **JavaScript ES5+** vanilla — sem jQuery, React ou qualquer outro framework

---

## 📐 Decisões técnicas

- O quiz não usa a tag `<form>` para evitar comportamento de submissão padrão do navegador; o envio é tratado inteiramente via JavaScript.
- Todo o estado do quiz é mantido no DOM — sem `localStorage` ou estado externo.
- O `script.js` é carregado ao final do `<body>` para não bloquear a renderização do HTML.
- As classes CSS de feedback (`.correct`, `.wrong`) são aplicadas dinamicamente pelo JavaScript após o envio, mantendo o estilo separado da lógica.

---

## 🌱 Possíveis melhorias futuras

- Adicionar mais perguntas e embaralhar a ordem a cada tentativa
- Salvar a pontuação no `localStorage` para exibir um histórico
- Incluir imagens ilustrativas em cada pergunta
- Adicionar uma página de "Saiba mais" com links externos sobre sustentabilidade
