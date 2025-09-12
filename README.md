<h1> 🚧 Readme em construcao 🚧</h1>
<details>
<summary>
  🧑‍💻 Teste Técnico — Desenvolvedor Full Stack Júnior
</summary>
Você deverá desenvolver dois projetos integrados:
1. Projeto 1: Blackjack (21) — implementado em Next.js (frontend + backend).
2. Projeto 2: E-commerce — com NestJS no backend e frontend à sua escolha (React, Vue ou Angular).

O saldo conquistado no Projeto 1 será usado como moeda de pagamento no Projeto 2.
O sistema terá login único (SSO) baseado em login social.

🎯 Objetivo Geral

Avaliar sua capacidade de:
• Organizar e estruturar projetos
• Aplicar boas práticas (SOLID, Design Patterns, Clean Architecture / Hexagonal / DDD)
• Construir integrações entre sistemas
• Garantir qualidade de código, UX e performance
• Documentar e explicar suas decisões

🏗 Projeto 1 — Blackjack (21) em Next.js

📌 Regras do jogo (versão simplificada arcade)
• Sem dealer: apenas você contra o baralho.
• Rodada:
1. start: cria uma rodada com baralho embaralhado.
2. hit: compra 1 carta → recalcula total.
• Se total > 21 → Bust → rodada termina com 0 pontos.
3. stand: você para → calcula pontuação → rodada finalizada.
• Pontuação:
• total > 21 → 0 pontos
• total = 21 → 100 pontos
• 0 < total < 21 → floor((total/21) * 100)
• Baralho:
• 1 baralho de 52 cartas
• J/Q/K = 10
• Ás = 1 ou 11 (o que for melhor sem estourar)
• Saldo:
• Apenas vitórias adicionam saldo
• Nunca há subtração no jogo


📌 Estados da rodada
• idle → sem rodada ativa
• playing → jogador pode hit ou stand
• bust → passou de 21 → pontos=0 → rodada encerrada
• finished → jogador parou (stand) → pontos calculados

📌 API obrigatória (Next.js App Router)

Rotas em /api/game/*:
1. POST /api/game/start
• Inicia uma nova rodada (roundId, deck embaralhado, state=playing)
• Opcional: já dar 1 carta inicial
• Retorna: GameState
2. POST /api/game/hit
• Compra 1 carta
• Atualiza hand, total, state
• Se total > 21 → state=bust, pointsLastRound=0
• Retorna: GameState
3. POST /api/game/stand
• Calcula pontos (floor((t/21)*100))
• Atualiza score += points
• state=finished
• Retorna: GameState

📌 Anti-fraude e consistência
• Embaralhar no backend (não expor deck restante ao frontend)
• Usar seed/nonce para evidenciar aleatoriedade
• Registrar logs de rodada: roundId, seed, cartas compradas, timestamps
• Evitar replay e refresh abuse (validar estado no servidor)
• Idempotência em chamadas (roundId único por rodada)

📌 Interface mínima (frontend Next.js)
• Botões: Start, Hit, Stand
• Mostrar:
• Cartas da mão
• Total atual
• Estado da rodada
• Pontos da rodada
• Saldo acumulado
• Desabilitar botões quando não aplicáveis
• Prever loading / travar duplo clique

🛒 Projeto 2 — E-commerce (NestJS + frontend à sua escolha)

📌 Funcionalidades obrigatórias
1. Login social (SSO)
• O mesmo login deve funcionar para Jogo e E-commerce
• Provedores aceitos: Google, GitHub, Facebook, Apple (escolha livre)
2. Listagem de produtos (API externa)
• Agregar produtos de 3 APIs públicas diferentes
• Normalizar produtos por SKU/key comum
• Exibir:
• Menor preço em destaque
• Outros preços em lista
3. Carrinho
• Adicionar/remover produtos por SKU/Key
• Exibir subtotal e total em TKN
4. Checkout
• Pagamento 100% com saldo do jogo
• Debitar diretamente do saldo central
• Bloquear compra se saldo insuficiente
• Registro da transação no backend (NestJS)

📌 Integração de saldo (centralizada)
• Moeda: TKN (criptomoeda fictícia, conversão 1:1 com pontos do jogo)
• Endpoints sugeridos:
• GET /balance → saldo atual
• POST /credit → crédito (origem: Blackjack → precisa roundId)
• POST /debit → débito (origem: E-commerce → precisa orderId)
• Logar todas transações

🔐 Autenticação e SSO
• Um único login social para os dois projetos
• Usuário = chave única de saldo
• Tokens JWT ou sessão compartilhada para autenticar nas duas apps

📚 Documentação (README obrigatório)
• Como rodar localmente
• Variáveis .env.example
• Endpoints principais (ex.: /api/game/*, /balance, /products, /checkout)
• Como funciona a integração entre os sistemas
• Decisões técnicas de arquitetura
• Limitações conhecidas

📽 Vídeo de explicação (obrigatório)
• Duração: livre (mas objetivo)
• Idioma: livre
• Deve cobrir:
• Decisões de arquitetura
• Organização do código
• Fluxo do jogo + integração com saldo
• Fluxo de compra no e-commerce
• Como rodar/testar os projetos
• Deploy (se houver)

Extras que contam como plus
• Testes automatizados (unitários, integração, e2e)
• CI/CD configurado
• Documentação detalhada (ADR, diagramas C4)
• Deploy funcional (Vercel, Render, etc.)
• Medidas de segurança (OWASP, LGPD, rate limiting)
• Performance otimizada (cache, paginação, Lighthouse 80+)

✅ Checklist de entrega

Projeto 1 — Blackjack
• Implementação das regras
• API /start, /hit, /stand
• RNG com seed/nonce e logs
• Frontend com botões + estado da rodada
• Creditar saldo no sistema central

Projeto 2 — E-commerce
• Login social (SSO)
• Integração de 3 APIs de produtos
• Normalização por SKU + menor preço em destaque
• Carrinho de compras
• Checkout 100% com saldo do jogo
• Débito no saldo central com idempotência

Geral
• Saldo centralizado (/balance, /credit, /debit)
• README(s) com instruções
• Vídeo obrigatório
• Código público no GitHub
• Deploy (opcional, plus)

🚀 Entrega final
1. Suba o código no seu GitHub pessoal em repositório(s) público(s).
2. Inclua:
• README completo
• Vídeo explicativo (link no README)
• (Opcional) Links de deploy
3. Envie o link do(s) repositório(s) para avaliação.

</details>
