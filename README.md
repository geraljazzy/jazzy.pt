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
| Opiniões de clientes | lista `opinioes` |

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
- Enquanto uma foto não existir, aparece um espaço reservado com o nome do ficheiro em falta.
- O **primeiro** projeto da lista é o que aparece em destaque no topo da página.

## Funcionalidades

- Comparador antes/depois que se arrasta (rato, toque e teclado)
- Filtros por categoria e visualização em ecrã inteiro com navegação
- Formulário de orçamento que abre o WhatsApp com a mensagem já preenchida
- Botão flutuante do WhatsApp, carrossel de opiniões, FAQ e contadores animados
- Menu para telemóvel, animações ao fazer scroll e respeito pela opção "reduzir movimento"
