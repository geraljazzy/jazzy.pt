/* =====================================================================
   CONFIGURAÇÃO DO SITE — edite apenas este ficheiro para atualizar
   contactos, trabalhos (antes/depois) e opiniões de clientes.
   ===================================================================== */

window.SITE = {
  // ---- Contactos -----------------------------------------------------
  whatsapp: "351912345678",          // só números, com indicativo (351…)
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

  // ---- Opiniões de clientes -------------------------------------------
  opinioes: [
    { nome: "Ana R.", local: "Porto", texto: "Trabalho impecável na casa de banho. Cumpriram o prazo e deixaram tudo limpo. Recomendo!" },
    { nome: "Carlos M.", local: "Braga", texto: "Orçamento claro, sem surpresas no fim. A cozinha ficou exatamente como imaginámos." },
    { nome: "Sofia L.", local: "Guimarães", texto: "Equipa simpática e muito profissional. Já os chamei para uma segunda obra." }
  ]
};
