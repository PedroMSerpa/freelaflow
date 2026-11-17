# Decisões de arquitetura

## Escopo da primeira versão

Aplicação React client-side para demonstrar um fluxo completo de gestão freelance. O estado de projetos fica no componente principal e é compartilhado entre as cinco telas; totais, clientes e progresso são derivados desses dados, evitando cópias inconsistentes.

Um projeto contém cliente, categoria, valor contratado, data de entrega, status, recebimento e tarefas. Status e conclusão de tarefas são independentes: concluir o checklist não aprova automaticamente uma entrega ao cliente. Recebimentos também são independentes do status do projeto.

## Persistência

O armazenamento usa a chave versionada `freelaflow:projects:v1`. Na inicialização, dados passam por validação estrutural. Registros inválidos ou armazenamento inacessível levam ao conjunto de demonstração. Falhas de escrita exibem mensagem ao usuário. A exportação gera um JSON com versão e data.

O localStorage é adequado para demonstração e dados não sensíveis. Não oferece autenticação, compartilhamento ou proteção contra limpeza do navegador. Uma versão comercial exigirá backend, isolamento por usuário e política de backups.

## Interface

CSS com tokens de cores, layouts em grid e breakpoints para desktop, tablet e celular. Animações usam transform e opacidade; `prefers-reduced-motion` as desativa. Formulário em `dialog` nativo para foco modal e fechamento com Escape. Campos possuem rótulos e validação HTML. Ícones acionáveis possuem nomes acessíveis.

## Qualidade

TypeScript em modo estrito. Testes cobrem validação de dados persistidos e cálculo de progresso. CI executa instalação pelo lockfile, testes e compilação. A validação visual e os testes ponta a ponta ainda precisam ser realizados em navegador antes da publicação final.

## Evolução

Conforme o domínio crescer, separar telas em módulos, extrair persistência para hook/repositório e adicionar roteamento por URL. Evitar introduzir camadas sem uma necessidade concreta. A primeira versão não usa IA no produto, integrações bancárias ou notificações externas.
