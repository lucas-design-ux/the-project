# Diretrizes de Conteúdo (Content Guidelines)

Este documento estabelece as melhores práticas para a criação de conteúdo no **The Blog Ecosystem**, garantindo que a qualidade visual, a acessibilidade e o SEO estejam sempre alinhados com a arquitetura técnica do projeto.

## Títulos de Artigos

O "Protocolo de Títulos Dinâmicos" do sistema garante que títulos de qualquer tamanho sejam exibidos de forma elegante, mas seguir estas diretrizes maximiza o impacto e a legibilidade.

### 1. Tamanho Ideal
*   **Recomendação:** Entre **50 e 70 caracteres**.
*   **Por que?** É o ponto ideal para SEO (aparece completo nos resultados do Google) e para leitura rápida nos cards da Homepage.

### 2. Comportamento Visual no Sistema
*   **Homepage & Categorias:** O sistema exibirá no máximo **3 linhas** do título. Se o texto exceder esse limite, ele será truncado com "..." (reticências).
    *   *Nota:* O título completo é sempre acessível. Ao passar o mouse sobre um título truncado, o usuário verá o texto integral.
*   **Página do Artigo:** O título será exibido integralmente, com uma quebra de linha controlada (`max-w-4xl`) para evitar linhas excessivamente longas que cansam a leitura.

### 3. Estrutura e Impacto
*   **A "Frente de Notícia":** Coloque a informação mais crucial ou a palavra-chave principal no **início** do título. Isso garante que a essência da notícia seja visível mesmo se o final for truncado em dispositivos móveis menores.
*   **Clareza > Clickbait:** Títulos devem ser claros e descritivos. O design minimalista do blog favorece a autoridade e a confiança, e títulos sensacionalistas quebram essa estética.

---

## Resumo Técnico para Desenvolvedores
Este projeto utiliza:
*   `line-clamp-3` nos cards para truncamento visual.
*   Atributo `title="..."` para acessibilidade nativa em textos truncados.
*   `max-w-4xl` nos headers de artigo para controle de largura de linha (reading length).
