# X.Sapiens

X.Sapiens é um projeto de aprendizado contínuo focado em construir software de forma prática, organizada e com evolução incremental.  
O objetivo é treinar fundamentos (HTML/CSS/JavaScript), Git/GitHub e uso de IA como apoio, sempre com entregas pequenas e consistentes.

> Status atual: **MVP Habit Tracker (front-end puro + persistência local)**

---

## ✅ O que já existe (MVP)

- Adicionar hábitos
- Marcar como concluído / não concluído
- Editar hábito
- Excluir hábito
- Filtro de visualização (ex: todos / pendentes / concluídos)
- Persistência no navegador via `localStorage`

---

## 🧠 O que estou treinando aqui

- Manipulação do DOM (criação/atualização de elementos)
- Estado em memória (arrays/objetos) + renderização
- Fluxo de eventos (event listeners)
- Persistência simples com `localStorage` + `JSON`
- Organização incremental + commits pequenos

---

## ▶️ Como rodar localmente (Live Server)

1. Abra o projeto no **VS Code**
2. Instale a extensão **Live Server**
3. Clique com o botão direito em `index.html` → **Open with Live Server**

Pronto. O app abre no navegador e recarrega automaticamente a cada alteração.

---

## 🧱 Estrutura do projeto

- `index.html` → estrutura da interface
- `style.css` → estilos
- `script.js` → lógica do app (estado, eventos, render, persistência)
- `docs/` → anotações e decisões (ex: ADRs)
- `README.md` → visão geral do projeto

---

## 🗺️ Roadmap (alto nível)

### Concluído
- [x] Definir primeira ideia simples: **Habit Tracker (MVP)**
- [x] CRUD de hábitos (add/edit/delete)
- [x] Marcar como concluído
- [x] Persistência com `localStorage`
- [x] Filtro de hábitos

### Próximos passos (curto prazo)
- [ ] Contadores: Pendentes / Concluídos
- [ ] Botão “Limpar concluídos”
- [ ] Validações: bloquear hábito vazio/duplicado
- [ ] Melhorar acessibilidade (labels, foco, teclado)

### Futuro (quando fizer sentido)
- [ ] Refatorar para arquitetura mais modular
- [ ] Versão com Next.js + TypeScript
- [ ] Persistência em banco (Supabase/PostgreSQL) + autenticação

---

## 🧰 Tecnologias

- HTML
- CSS
- JavaScript (Vanilla)
- Git & GitHub
- Live Server (desenvolvimento local)

---

## 📌 Notas

Este repositório evolui por iterações pequenas.  
Mudanças relevantes serão refletidas no README e/ou em `docs/`.
