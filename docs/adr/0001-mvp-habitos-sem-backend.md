# ADR 0001: MVP de hábitos com localStorage e DOM puro

## Contexto
Quero construir um MVP simples para praticar fundamentos (DOM, eventos, estado) e ter um produto funcionando rápido.

## Decisão
- Persistir dados no navegador usando `localStorage`.
- Renderizar a lista recriando os itens a cada mudança (função `renderHabits`), por simplicidade.
- Manter tudo em HTML/CSS/JS puro (sem frameworks) para focar nos fundamentos.

## Alternativas consideradas
- Backend + banco de dados: aumentaria muito o escopo.
- Framework (React/Vue): esconderia parte do aprendizado de DOM/eventos.

## Consequências
- Prós: rápido, fácil de entender, roda offline, ideal para estudo.
- Contras: não sincroniza entre dispositivos e não escala para muitos dados.
