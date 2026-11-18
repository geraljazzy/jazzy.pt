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

  // De quantos em quantos segundos muda o trabalho em destaque no topo
  rotacaoSegundos: 30,

  // ---- Trabalhos: Antes & Depois --------------------------------------
  // As fotos originais estão em img/projetos/; as versões recortadas para o site em img/projetos/web/.
  // Use fotos tiradas do MESMO ângulo para o comparador ficar perfeito.
  // Categorias disponíveis: definidas automaticamente a partir daqui.
  projetos: [
    {
      titulo: "Pintura de muro e empena",
      categoria: "Pintura",
      antes: "img/projetos/web/muro-antes.jpg",
      depois: "img/projetos/web/muro-depois.jpg",
      descricao: "Preparação das superfícies e pintura a branco do muro e da empena."
    },
    {
      titulo: "Limpeza e pintura de telhado",
      categoria: "Telhados",
      antes: "img/projetos/web/telhado-antes.jpg",
      depois: "img/projetos/web/telhado-depois.jpg",
      descricao: "Lavagem à pressão, remoção de musgo e pintura das telhas."
    },
    {
      titulo: "Pintura exterior de moradia",
      categoria: "Pintura",
      antes: "img/projetos/web/moradia-antes.jpg",
      depois: "img/projetos/web/moradia-depois.jpg",
      descricao: "Primário e pintura completa da fachada."
    },
    {
      titulo: "Impermeabilização de claraboias",
      categoria: "Telhados",
      antes: "img/projetos/web/claraboias-antes.jpg",
      depois: "img/projetos/web/claraboias-depois.jpg",
      descricao: "Tratamento e pintura da base das claraboias."
    },
    {
      titulo: "Claraboia em telhado antigo",
      categoria: "Telhados",
      antes: "img/projetos/web/claraboia-antes.jpg",
      depois: "img/projetos/web/claraboia-depois.jpg",
      descricao: "Reparação e impermeabilização da base da claraboia."
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
