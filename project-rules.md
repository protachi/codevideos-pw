# Processo de Desenvolvimento e Padrões do Repositório

## 🛡️ Proteção da Branch `main` (Produção)

A branch `main` representa o código em produção (e dispara o deploy automático). Por isso, as seguintes regras estão ativas no GitHub:

- **Push Direto Bloqueado:** Não é permitido fazer `git push` direto na `main`. Toda e qualquer alteração deve vir por meio de um **Pull Request (PR)**.
- **Revisão Obrigatória:** O merge só é liberado após a aprovação de pelo menos **1 integrante do time**.

---

## 🏷️ Padrão de Commits e Branches

### 1. Tipos de Alteração (Commits e Branches)

- `feat`: Adição de uma nova funcionalidade (ex: criação de tela, eventos de botões, novos layouts).
- `fix`: Correção de um erro ou bug na aplicação.
- `docs`: Alteração ou criação de documentações (ex: `README.md`, templates, diagramas).
- `chore`: Tarefas de manutenção ou configuração que não alteram código de funcionalidade (ex: atualizar dependências do `package.json`, `.gitignore`).

### 2. Nome das Branches

Use o tipo da alteração como prefixo seguido por uma descrição curta do que está sendo feito (em letras minúsculas e separadas por hífen):

- `feat/nome-da-funcionalidade` → Ex: `feat/autenticacao-jwt`, `feat/produtos-modais`
- `fix/descricao-do-bug` → Ex: `fix/layout-mobile-header`
- `docs/documentacao-atualizada` → Ex: `docs/pr-template`

### 3. Mensagens de Commit

Siga o padrão **Conventional Commits**: `tipo(escopo): descrição curta`
*(O escopo entre parênteses é opcional, mas ajuda a identificar a página/módulo alterado).*

Exemplos:

```bash
# Funcionalidades (feat)
feat(produtos): adiciona layout da pagina
feat(auth): ajusta rotas de navegacao

# Correções (fix)
fix(produtos): corrige alinhamento de botao
fix(shared-ui): ajusta margem no header

# Documentação (docs)
docs(workflow): atualiza guia de contribuicao do projeto
docs(readme): adiciona instrucoes de instalacao local

# Manutenção / Tarefas (chore)
chore(deps): adiciona biblioteca de componentes UI
chore(angular): atualiza arquivos de configuracao do projeto
chore(git): adiciona pasta dist e node_modules ao gitignore
```

---

## 🔀 Fluxo de Pull Requests (PRs)

### PRs Concisos e Objetivos

- Evite PRs gigantescos com dezenas de arquivos alterados. Quanto menor e mais focado o PR, mais rápida e segura será a revisão do seu colega.
- Abra o PR como Draft PR assim que fizer o primeiro push. Isso avisa ao time que a tarefa está em andamento.
- Quando o trabalho estiver concluído, responda ao checklist do template, marque as evidências (prints/GIFs) e altere o status para "Ready for review".
