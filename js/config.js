/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite apenas este ficheiro para atualizar
   contactos, trabalhos (antes/depois) e opiniões de clientes.
   ===================================================================== */

window.SITE = {
  // ---- Contactos -----------------------------------------------------
  whatsapp: "351912345678",          // só números, com indicativo (351…); abre o chat diretamente
  mensagemWhatsapp: "Olá, gostaria de pedir um orçamento.",
  telefone: "+351 912 345 678",
  email: "geral@monteiroservicos.pt",
  zona: "Portugal — Norte e Centro",
  horario: "Seg–Sáb · 08h00–19h00",
  instagram: "monteiro_servic",

  // ---- Trabalhos: Antes & Depois --------------------------------------
  // Coloque as fotos em img/projetos/ e indique os nomes abaixo.
  // Use fotos tiradas do MESMO ângulo para o comparador ficar perfeito.
  // Categorias disponíveis: definidas automaticamente a partir daqui.
  projetos: [
    {
      titulo: "Remodelação de casa de banho",
      categoria: "Casas de banho",
      local: "Porto",
      antes: "img/projetos/wc-antes.jpg",
      depois: "img/projetos/wc-depois.jpg",
      descricao: "Substituição de loiças, base de duche e revestimento integral."
    },
    {
      titulo: "Cozinha moderna",
      categoria: "Cozinhas",
      local: "Braga",
      antes: "img/projetos/cozinha-antes.jpg",
      depois: "img/projetos/cozinha-depois.jpg",
      descricao: "Novos móveis, bancada em compacto e iluminação LED."
    },
    {
      titulo: "Pintura de sala",
      categoria: "Pintura",
      local: "Guimarães",
      antes: "img/projetos/sala-antes.jpg",
      depois: "img/projetos/sala-depois.jpg",
      descricao: "Reparação de fissuras, tetos e paredes em tons neutros."
    },
    {
      titulo: "Pavimento flutuante",
      categoria: "Pavimentos",
      local: "Viana do Castelo",
      antes: "img/projetos/chao-antes.jpg",
      depois: "img/projetos/chao-depois.jpg",
      descricao: "Remoção de alcatifa e aplicação de flutuante AC5."
    },
    {
      titulo: "Fachada renovada",
      categoria: "Pintura",
      local: "Aveiro",
      antes: "img/projetos/fachada-antes.jpg",
      depois: "img/projetos/fachada-depois.jpg",
      descricao: "Lavagem, impermeabilização e pintura exterior."
    },
    {
      titulo: "Quarto renovado",
      categoria: "Remodelações",
      local: "Matosinhos",
      antes: "img/projetos/quarto-antes.jpg",
      depois: "img/projetos/quarto-depois.jpg",
      descricao: "Estuque, novas tomadas, rodapés e pintura."
    }
  ],

  // ---- Testemunhos reais de clientes ---------------------------------
  // Adicione aqui os testemunhos à medida que os clientes os enviarem.
  // "foto" é opcional (coloque-a em img/clientes/). Sem foto aparece a inicial.
  // Enquanto a lista estiver vazia, o site mostra espaços reservados.
  //
  // Exemplo:
  // { nome: "Ana Ribeiro", local: "Porto", servico: "Casa de banho",
  //   texto: "Escreva aqui o testemunho exatamente como o cliente o enviou.",
  //   foto: "img/clientes/ana.jpg" },
  testemunhos: [
  ],

  // Número de espaços reservados a mostrar enquanto não houver testemunhos
  espacosTestemunhos: 3
};
