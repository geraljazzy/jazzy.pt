# Monteiro Serviços — Website

Site de uma só página, rápido e responsivo, para a Monteiro Serviços (Instagram: [@monteiro_servic](https://www.instagram.com/monteiro_servic)).
Não precisa de instalar nada: são só ficheiros HTML, CSS e JavaScript.

## Como ver o site

Abra o `index.html` no navegador, ou publique a pasta num alojamento estático (Netlify, Vercel, GitHub Pages, cPanel…).

## Como editar (tudo em `js/config.js`)

| O quê | Onde |
|---|---|
| WhatsApp, telefone, email, zona, horário | `whatsapp`, `telefone`, `email`, `zona`, `horario` |
| Trabalhos antes/depois | lista `projetos` |
| Testemunhos reais | lista `testemunhos` |

### Adicionar fotos de antes e depois

1. Copie as fotos para `img/projetos/` (ex.: `cozinha-antes.jpg` e `cozinha-depois.jpg`).
2. Em `js/config.js`, adicione ou edite um bloco na lista `projetos`:

```js
{
  titulo: "Cozinha moderna",
  categoria: "Cozinhas",      // cria automaticamente um botão de filtro
  local: "Braga",
  antes: "img/projetos/cozinha-antes.jpg",
  depois: "img/projetos/cozinha-depois.jpg",
  descricao: "Novos móveis, bancada e iluminação LED."
}
```

Algumas dicas:
- Tire as duas fotos **do mesmo sítio e com o mesmo enquadramento**, para o comparador ficar perfeito.
- Use fotos na horizontal (proporção 4:3), com cerca de 1600 px de largura e menos de 400 KB (pode comprimir em squoosh.app).
- Enquanto uma foto não existir, aparece um desenho de espaço reservado.
- O topo da página mostra os projetos um a um, pela ordem da lista.

## Funcionalidades

- Comparador antes/depois que se arrasta (rato, toque e teclado)
- Destaque no topo que muda de trabalho de 30 em 30 segundos (`rotacaoSegundos` em `js/config.js`), com setas para avançar ou recuar
- Filtros por categoria e visualização em ecrã inteiro com navegação
- Formulário de orçamento que abre o WhatsApp com a mensagem já preenchida
- Logótipo do WhatsApp no topo, no contacto, no rodapé e flutuante: abre diretamente a conversa
- Secção de testemunhos reais (lista `testemunhos` em `js/config.js`, com foto opcional em `img/clientes/`)
- Design sóbrio azul e branco, sem cantos arredondados, adaptado a telemóvel

`monteiro-servicos.html` é uma cópia do site num só ficheiro. Não se atualiza sozinha: tem de ser gerada de novo depois de alterar os outros ficheiros.
