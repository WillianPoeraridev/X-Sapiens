# Roadmap — X.Sapiens

Este roadmap descreve a evolução do projeto em etapas pequenas e verificáveis.
Regra: **escopo controlado** e **entregas incrementais**.

---

## ✅ Status atual (MVP)
**Habit Tracker (front-end puro + persistência local)**

Entregue:
- [x] CRUD de hábitos (adicionar / editar / excluir)
- [x] Marcar como concluído / não concluído
- [x] Persistência com `localStorage` (`JSON.parse/stringify`)
- [x] Filtro de visualização (todos / pendentes / concluídos)

---

## 🔜 Próximas entregas (curto prazo)
Objetivo: melhorar UX e robustez sem aumentar complexidade.

- [ ] Contadores: Pendentes / Concluídos
- [ ] Botão “Limpar concluídos”
- [ ] Validações:
  - [ ] bloquear hábito vazio
  - [ ] bloquear hábito duplicado
- [ ] Acessibilidade:
  - [ ] foco visível
  - [ ] navegação por teclado
  - [ ] labels/aria básicos

---

## 🧱 Evolução do código (médio prazo)
Objetivo: organizar melhor para facilitar mudanças.

- [ ] Separar funções em módulos (ex: `storage`, `render`, `handlers`)
- [ ] Padronizar convenções (nomes, responsabilidades)
- [ ] Adicionar “mini testes” manuais documentados (checklist)

---

## 🚀 Versão profissional (longo prazo)
Objetivo: versão “portfolio-ready” com stack moderna.

- [ ] Migrar para Next.js + TypeScript
- [ ] Banco de dados (Supabase/PostgreSQL)
- [ ] Autenticação (login real)
- [ ] Deploy (Vercel)
- [ ] Painel/área do usuário
- [ ] Documentação mais completa (ex: ADRs + guia rápido)

---

## 📌 Regras de atualização
Atualizar este arquivo quando:
1) uma entrega do curto prazo for concluída  
2) uma nova fase começar (ex: migração para Next.js)  

Se nada disso aconteceu, **não mexer**.
