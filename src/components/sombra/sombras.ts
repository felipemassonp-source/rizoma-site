/**
 * Sombras de posturas (imagens enviadas pelo Felipe, em /public/sombras).
 * A imagem é usada como máscara: a cor vem do site (currentColor),
 * então a mesma sombra fica vinho, terracota ou creme conforme o fundo.
 */

export type SombraDados = { id: string; sanscrito: string; nome: string; w: number; h: number };

export const SOMBRAS: SombraDados[] = [
  { id: "lotus", sanscrito: "Padmāsana", nome: "Lótus", w: 739, h: 800 },
  { id: "arvore", sanscrito: "Vṛkṣāsana", nome: "Árvore", w: 363, h: 800 },
  { id: "guerreiro", sanscrito: "Vīrabhadrāsana II", nome: "Guerreiro II", w: 838, h: 800 },
  { id: "lua", sanscrito: "Añjaneyāsana", nome: "Lua crescente", w: 811, h: 800 },
  { id: "cobra", sanscrito: "Bhujaṅgāsana", nome: "Cobra", w: 1061, h: 696 },
  { id: "torcao", sanscrito: "Parivṛtta", nome: "Torção", w: 687, h: 800 },
  { id: "pombo", sanscrito: "Kapotāsana", nome: "Pombo", w: 1016, h: 800 },
  { id: "prancha-lateral", sanscrito: "Vasiṣṭhāsana", nome: "Prancha lateral", w: 807, h: 800 },
  { id: "roda", sanscrito: "Ūrdhva Dhanurāsana", nome: "Roda", w: 1045, h: 776 },
  { id: "arado", sanscrito: "Halāsana", nome: "Arado", w: 1065, h: 556 },
  { id: "cachorro", sanscrito: "Adho Mukha Śvānāsana", nome: "Cachorro olhando para baixo", w: 1056, h: 607 },
  { id: "torcao-sentada", sanscrito: "Ardha Matsyendrāsana", nome: "Meia torção sentada", w: 855, h: 800 },
];

export const sombra = (id: string) => SOMBRAS.find((s) => s.id === id) ?? SOMBRAS[0];
