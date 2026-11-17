# FreelaFlow ✳

[![CI](https://github.com/PedroMSerpa/freelaflow/actions/workflows/ci.yml/badge.svg)](https://github.com/PedroMSerpa/freelaflow/actions/workflows/ci.yml)

**Seu trabalho. Seu ritmo. Menos caos, mais flow.**

Workspace para profissionais independentes acompanharem projetos, tarefas, clientes e recebimentos em um único lugar. Projeto de portfólio de [Pedro Serpa](https://github.com/PedroMSerpa), desenvolvido para a atividade AT2-N2 de Desenvolvimento de Sistema Web.

## A proposta

O freelancer precisa criar e também administrar o próprio trabalho. O FreelaFlow conecta prazos, etapas e valores para reduzir a dispersão entre ferramentas. Um pagamento registrado aparece no resumo; uma tarefa concluída atualiza o progresso do projeto.

## Funcionalidades

- Dashboard com indicadores calculados a partir dos projetos.
- Criação, edição e exclusão de projetos, incluindo tarefas, valores e prazos.
- Busca por projeto ou cliente e filtros por status.
- Quadro por etapas com seleção de status e checklist de tarefas.
- Clientes agrupados automaticamente pelos projetos cadastrados.
- Controle manual de recebimentos com atualização dos totais.
- Persistência local e exportação de backup em JSON.
- Interface responsiva, navegação por teclado, diálogo nativo e respeito à preferência por movimento reduzido.

## Executar

Requisitos: Node.js 22 ou superior e npm.

```bash
npm ci
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente `http://127.0.0.1:5173`.

```bash
npm test          # Testes das regras de dados
npm run build    # TypeScript e build de produção
npm run preview  # Servir o build localmente
```

## Tecnologia e estrutura

React 19 · TypeScript · Vite · Lucide · CSS · Vitest

```text
src/
  components/ProjectDialog.tsx  # Formulário acessível de projetos e tarefas
  lib/projects.ts              # Tipos, validação, dados de demonstração e cálculos
  lib/projects.test.ts         # Testes das regras de dados
  App.tsx                      # Telas, navegação e estado compartilhado
  main.tsx                     # Inicialização do React
  styles.css                   # Identidade visual e responsividade
docs/
  architecture.md              # Decisões e limites da primeira versão
  presentation.md              # Roteiro para demonstração
.github/workflows/ci.yml       # Verificação em pushes e pull requests
```

## Design

Identidade própria com carvão, verde-lima, tipografia Manrope/DM Sans, cartões com categorias em cores e composição orbital em CSS. Referências de estudo: organização do [Linear](https://linear.app), contenção visual da [Vercel](https://vercel.com) e hierarquia de informações da [Stripe](https://stripe.com). Não há afiliação com essas marcas.

As fontes são carregadas pelo Google Fonts, com fallback para fontes locais. Os ícones são do Lucide, sob licença ISC. A ilustração e o símbolo do aplicativo são feitos em CSS/SVG.

## Dados e limites

Os dados iniciais são fictícios. Esta versão funciona sem login ou backend: tudo fica no `localStorage` do navegador atual. Não existe sincronização entre dispositivos. Limpar os dados do navegador apaga os registros; a exportação permite conservar uma cópia, mas a importação ainda não está implementada. O controle financeiro registra informações manualmente e não processa pagamentos.

## Próximos passos

- Importação validada de backups.
- Autenticação e sincronização com backend.
- Testes de interação e testes ponta a ponta.
- Screenshots reais e URL da demonstração após publicação.

Veja [as decisões de arquitetura](docs/architecture.md) e [o roteiro da apresentação](docs/presentation.md).

Para acompanhar o desenvolvimento, consulte os [pull requests](https://github.com/PedroMSerpa/freelaflow/pulls), o [histórico de commits](https://github.com/PedroMSerpa/freelaflow/commits/main) e o [guia de contribuição](CONTRIBUTING.md).

## Autoria

Pedro Serpa. Implementação desenvolvida com auxílio de IA, com decisões e limites documentados para estudo e evolução do projeto. Nenhuma licença de redistribuição foi definida nesta etapa.
