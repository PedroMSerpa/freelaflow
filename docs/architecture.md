# Decisões de arquitetura

## Escopo da primeira versão

Aplicação React client-side para demonstrar um fluxo completo de gestão freelance. O estado de projetos fica no componente principal e é compartilhado entre as cinco telas; totais, clientes e progresso são derivados desses dados, evitando cópias inconsistentes.

Um projeto contém cliente, categoria, valor contratado, data de entrega, status, recebimento e tarefas. Status e conclusão de tarefas são independentes: concluir o checklist não aprova automaticamente uma entrega ao cliente. Recebimentos também são independentes do status do projeto.

## Persistência

O armazenamento usa a chave versionada `freelaflow:projects:v1`. Na inicialização, dados passam por validação estrutural. Registros inválidos ou armazenamento inacessível levam ao conjunto de demonstração. Falhas de escrita exibem mensagem ao usuário. A exportação gera um JSON com versão e data.

O localStorage é adequado para demonstração e dados não sensíveis. Não oferece autenticação, compartilhamento ou proteção contra limpeza do navegador. Uma versão comercial exigirá backend, isolamento por usuário e política de backups.

## Interface

A camada `Experience.tsx` organiza as rotas por hash: `#/` (apresentação), `#/entrar` (entrada local) e `#/app` (workspace). Sem sessão local, a rota do workspace encaminha à entrada. Isso organiza a experiência; não é uma barreira de segurança. O nome fica em `sessionStorage`, não há senha e os projetos continuam compartilhados no `localStorage`. A saída remove apenas a sessão. A arte `FlowSculpture` é um conjunto procedural de elipses SVG, com rotação e resposta ao ponteiro desativadas para movimento reduzido.

CSS com tokens de cores, layouts em grid e breakpoints para desktop, tablet e celular. Animações usam transform e opacidade; `prefers-reduced-motion` as desativa. Formulário em `dialog` nativo para foco modal e fechamento com Escape. Campos possuem rótulos e validação HTML. Ícones acionáveis possuem nomes acessíveis.

O componente `Sidebar` mantém cabeçalho e perfil fixos e usa uma região central com `min-height: 0` e rolagem independente. O modo compacto de 80 px preserva os nomes acessíveis dos atalhos e salva a preferência em `localStorage`. No celular, a largura compacta é ignorada: o menu vira um painel com foco contido, Escape, fechamento por fundo e restauração do foco. Fechado, o painel usa `inert`; aberto, bloqueia a rolagem da página. A troca para desktop encerra o estado móvel. Os comportamentos foram verificados no Chromium em desktop e celular com 500 px de altura.

## Qualidade

TypeScript em modo estrito. Testes cobrem validação de dados persistidos e cálculo de progresso. CI executa instalação pelo lockfile, formatação, testes e compilação. A nova experiência foi verificada no Chromium em desktop (1440 × 1000) e celular (390 × 844): entrada, sessão após recarga, saída, navegação mobile, perguntas frequentes, ausência de rolagem horizontal e movimento reduzido. Também foram verificados criação de projeto, conclusão de tarefa, registro de recebimento e persistência após recarga. Essa verificação local não equivale a uma suíte de regressão ponta a ponta mantida no repositório. As capturas reais ficam em `docs/screenshots`.

## Evolução

Conforme o domínio crescer, separar telas em módulos, extrair persistência para hook/repositório e adicionar roteamento por URL. Evitar introduzir camadas sem uma necessidade concreta. A primeira versão não usa IA no produto, integrações bancárias ou notificações externas.
