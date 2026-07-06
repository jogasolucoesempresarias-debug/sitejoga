# Site JOGA Soluções Empresariais

Site institucional em **`jogasolucoes.com.br`**. Next.js (App Router) **exportado estático**,
servido por **nginx** no mesmo Docker Swarm/Traefik/GHCR dos outros apps da JOGA.

- **Fase 1 (este repo):** home institucional + CTA de diagnóstico via WhatsApp/formulário.
- **Fase 2 (depois):** app `/diagnostico` completo (FastAPI + IA + upload de planilha). Ver
  `JOGA-Brand/Diagnostico_JOGA_Spec_v1.md`.

## Stack
Next.js 16 · React 19 · TypeScript · Tailwind v4 · Framer Motion · `output: 'export'` → nginx.
Marca: grafite `#13171E` + âmbar `#F4A52A`. Fontes: Space Grotesk (títulos) + Inter (texto).

## Rodar local (dev)
```bash
npm install
npm run dev            # http://localhost:3000
```
Dica de QA: abra qualquer página com `?noanim` para desligar as animações de entrada
(útil para print/revisão).

## Build estático
```bash
npm run build          # gera /out (site estático)
npx serve out          # ou: python -m http.server 4173 --directory out
```

## Estrutura
```
app/                 # home, /diagnostico (interino), /politica-privacidade, layout, globals.css
components/          # Header, Hero, Camadas (sticky-stack), Solucoes, Metodologia, etc.
lib/site.ts         # contatos, links, WhatsApp — fonte única
public/brand/       # logos e favicon (kit da marca)
public/demos/       # AGUARDA os prints anonimizados (seção Demonstrações)
Dockerfile          # node build -> nginx
nginx.conf          # static + /health + cache
docker-compose.prod.yml
.github/workflows/deploy.yml
```

## Adicionar as telas de Demonstração
1. Colocar os prints anonimizados em `public/demos/` (ex.: `carteira.png`, `estoque.png`, `dre.png`).
2. Em `components/Demonstracoes.tsx`, descomentar/preencher o campo `img` de cada card.

## Deploy (servidor JOGA — Swarm/Traefik/GHCR)

### Fluxo
```
git push main → GitHub Action → ghcr.io/jogasolucoesempresarias-debug/sitejoga:latest → docker service update
```

### Primeira vez
1. **DNS Cloudflare:** `jogasolucoes.com.br` (apex) + `www` → IP do servidor (**DNS only** no 1º
   apontamento p/ o Let's Encrypt validar).
2. **Portainer → Add stack** com `docker-compose.prod.yml` (imagem GHCR privada — usar a credencial
   do GHCR já configurada na org).
3. Traefik emite o TLS (`certresolver=le`), roteia o apex e redireciona `www` → apex.

### Rotina de atualização
```bash
git add -A && git commit -m "descreva a mudança" && git push origin main
# esperar a Action ficar verde (aba Actions, ~2-3 min)

# no servidor:
docker service update \
  --image ghcr.io/jogasolucoesempresarias-debug/sitejoga:latest \
  --with-registry-auth --force sitejoga_site-app
```
> Alternativa: Portainer → Stacks → sitejoga → **Pull and redeploy** (marcar "re-pull image").

### Conferir
```bash
curl -I https://jogasolucoes.com.br        # espera 200
curl https://jogasolucoes.com.br/health     # "ok"
```
⚠️ A Cloudflare cacheia `/_next/static/**` — **purgar o cache** após deploy de mudança visual.
