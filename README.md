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

## Blog (`/blog/`)
Os artigos **não ficam neste repo**: o João escreve em **https://jogasolucoes.com.br/admin/blog**
(mesma senha do painel de leads), e eles moram no Postgres do `joga-diagnostico-api`
(tabelas `blog_posts` e `blog_imagens` — entram no backup diário).

```
Publicar (admin) → repository_dispatch "blog-atualizado" → esta Action → build lê
GET /api/blog/posts → imagem nova → deploy por SSH → no ar em ~5 min
```

- `lib/blog.ts` lê a API **no build** (HTTP direto do Node, sem o fetch do Next — senão vira rota
  dinâmica ou fica em cache entre builds). Se a API falhar, **o build falha** e o site anterior
  continua no ar. Tipos e funções puras ficam em `lib/blog-comum.ts` (o filtro roda no navegador).
- O link "Blog" no menu/rodapé só aparece quando há artigo publicado.
- HTML do artigo é sanitizado no backend (nh3); imagem só de `/api/blog/img/`.
- Dockerfile: `ARG BUILD_ID` quebra o cache do Docker no passo do build — sem isso, um rebuild
  só de blog reaproveitaria o build anterior.

**Testar local** (backend em :8000, ver o README dele):
```bash
BLOG_API_URL=http://localhost:8000 BLOG_ASSET_ORIGIN=http://localhost:8000 npm run build
python -m http.server 3000 --directory out
```
Sem backend: `BLOG_OFFLINE=true npm run build` (blog vazio).

## Medição
- `app/sitemap.ts` e `app/robots.ts` → `/sitemap.xml` e `/robots.txt` gerados no build.
- **GA4:** colar o ID (`G-...`) em `GA_ID` no `lib/site.ts`. Vazio = nada carrega. Eventos:
  `generate_lead` (diagnóstico geral e quiz de estoque concluídos), `contato_whatsapp` (qualquer
  link wa.me) e `cta_blog` (botão do fim do artigo). A política de privacidade só cita o GA
  quando o ID está preenchido.

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

### Deploy automático (SSH com chave restrita)
A Action faz o deploy sozinha quando existem os secrets abaixo; sem eles, só publica a imagem
(e o passo avisa). A chave **só consegue rodar o script de deploy** (forced command).

No servidor JOGA (MobaXterm, um comando por vez):
```bash
printf '#!/bin/sh
exec docker service update --image ghcr.io/jogasolucoesempresarias-debug/sitejoga:latest --with-registry-auth --force --quiet sitejoga_site-app
' | sudo tee /usr/local/bin/deploy-sitejoga >/dev/null && sudo chmod 755 /usr/local/bin/deploy-sitejoga
echo 'joaogabriel ALL=(root) NOPASSWD: /usr/local/bin/deploy-sitejoga' | sudo tee /etc/sudoers.d/deploy-sitejoga >/dev/null && sudo chmod 440 /etc/sudoers.d/deploy-sitejoga && sudo visudo -cf /etc/sudoers.d/deploy-sitejoga
ssh-keygen -t ed25519 -N "" -C github-deploy-sitejoga -f ~/deploy_sitejoga
echo "command=\"sudo -n /usr/local/bin/deploy-sitejoga\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty $(cat ~/deploy_sitejoga.pub)" >> ~/.ssh/authorized_keys
cat ~/deploy_sitejoga
ssh-keyscan -t ed25519 <IP do servidor> 2>/dev/null
rm ~/deploy_sitejoga ~/deploy_sitejoga.pub
```
GitHub → repo `sitejoga` → Settings → Secrets and variables → Actions:
`DEPLOY_SSH_KEY` (saída do `cat`, inteira), `DEPLOY_KNOWN_HOSTS` (saída do `ssh-keyscan`),
`DEPLOY_HOST` (IP do servidor), `DEPLOY_USER` (`joaogabriel`).

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
