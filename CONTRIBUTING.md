# Contribuindo com o FreelaFlow

## Preparação

Use Node.js 22 ou superior. Execute `npm ci` e `npm run dev`.
Leia o [README](README.md) e as [decisões de arquitetura](docs/architecture.md) antes de alterar o projeto.

## Branches e commits

- `main`: versão integrada, validada pelo CI.
- `feat/<descricao>`: funcionalidades.
- `fix/<descricao>`: correções.
- `docs/<descricao>`: documentação.
- `chore/<descricao>`: configuração e manutenção.

Crie branches a partir da `main` atualizada e mantenha cada PR focado em uma mudança coerente. Não é necessária uma branch `develop` permanente para este projeto individual.

Use mensagens com intenção clara, por exemplo:

```text
feat(projects): add project creation form
fix(finance): update totals after payment changes
docs: explain local persistence limitations
```

## Antes de abrir um PR

```bash
npm run format:check
npm test
npm run build
```

Verifique os fluxos afetados no navegador em desktop e celular. Confira foco por teclado, estados vazios e movimento reduzido. Registre no PR verificações não realizadas.

Não faça commit de credenciais, arquivos `.env`, dados pessoais de clientes, `node_modules` ou `dist`. Use apenas dados fictícios nas demonstrações.

## Revisão e integração

Descreva o problema, o comportamento resultante e como a alteração foi validada. Aguarde o CI e resolva falhas antes da integração. Preserve commits pequenos e significativos; exclua a branch remota depois da integração quando ela não for mais necessária.
