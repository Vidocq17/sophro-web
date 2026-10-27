# Étapes d'indexation Google — labullecalme.fr

Légende : ✅ Fait · 🟡 En cours · ⬜ À faire

_Dernière mise à jour : 2026-10-27. Les statuts « Fait » sont vérifiés dans le code ou sur le site en ligne. Les statuts Search Console ne sont pas vérifiables sans accès (voir étape 3)._

## 1. Base technique du site

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 1.1 | Site en ligne en HTTPS | ✅ Fait | `https://labullecalme.fr` répond 200 |
| 1.2 | Redirection HTTP → HTTPS | ✅ Fait | 308 vers `https://labullecalme.fr/` |
| 1.3 | Redirection `www` → domaine principal | ✅ Fait | `www.labullecalme.fr` répond 308 |
| 1.4 | `<html lang="fr">` | ✅ Fait | `src/app.html` |
| 1.5 | `robots.txt` autorise le crawl, bloque `/admin` et `/api` | ✅ Fait | `static/robots.txt`, référence le sitemap |
| 1.6 | `sitemap.xml` avec les 6 pages publiques | ✅ Fait | `src/routes/sitemap.xml/+server.ts`, en ligne |
| 1.7 | Pages d'erreur en `noindex` | ✅ Fait | `src/routes/+error.svelte` |

## 2. SEO on-page

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 2.1 | Composant `Seo` : title, description, canonical, Open Graph, Twitter | ✅ Fait | `src/lib/components/Seo.svelte` |
| 2.2 | Image de partage social | ✅ Fait | `SOCIAL_IMAGE` dans `src/lib/data/site.ts` |
| 2.3 | Données structurées `LocalBusiness` + `Person` | ✅ Fait | injectées dans `+layout.svelte` |
| 2.4 | Données structurées FAQ | ✅ Fait | page `/pourquoi-consulter` |
| 2.5 | Titres et descriptions uniques par page | ✅ Fait | Audité : 6 titres et 6 descriptions uniques, descriptions ≤ 160 car. Optionnel : 3 titres dépassent ~60 car. (contact 62, pourquoi-consulter 67, à propos 62) et peuvent être tronqués dans les résultats |
| 2.6 | Un seul `<h1>` par page, avec le mot-clé principal | ✅ Fait | Audité : 1 `h1` par page. Seul `/pourquoi-consulter` n'a pas « Charenton » dans le `h1` (le title l'a) |
| 2.7 | Attributs `alt` descriptifs sur toutes les images | ✅ Fait | Audité : une seule `<img>` (`/a-propos`), `alt`, `width`/`height` et `fetchpriority` présents |
| 2.8 | Maillage interne entre pages | ✅ Fait | Audité : header, footer et boutons d'appel à l'action relient les 6 pages ; ancres `/accompagnements#slug` depuis l'accueil et `/pourquoi-consulter` |
| 2.9 | Ajouter `<lastmod>` au sitemap | ⬜ À faire | Optionnel, faible priorité |

## 3. Google Search Console

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 3.1 | Créer la propriété Search Console | ✅ Fait | Créée par vous ; vérification via API impossible tant que l'API Search Console est désactivée côté Google Cloud |
| 3.2 | Valider la propriété (TXT DNS pour une propriété Domaine) | 🟡 En cours | À confirmer : statut « Validée » visible dans Search Console ? |
| 3.3 | Soumettre `https://labullecalme.fr/sitemap.xml` | ⬜ À faire | Menu Sitemaps |
| 3.4 | Inspecter l'URL de l'accueil → « Demander une indexation » | ⬜ À faire | Répéter pour les 5 autres pages |
| 3.5 | Vérifier le rapport « Pages » (aucune page exclue par erreur) | ⬜ À faire | Après quelques jours |

## 4. Présence locale (sophrologue à Charenton-le-Pont)

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 4.1 | Créer la fiche Google Business Profile | ✅ Fait | Fiche créée, établissement « fermé » en attendant le lancement |
| 4.1b | Rouvrir la fiche et renseigner l'URL du site au lancement | ⬜ À faire | Levier n°1 pour « sophrologue Charenton » (carte + recherche locale) |
| 4.2 | Cohérence NAP (nom, adresse, téléphone) identique site / fiche / annuaires | ⬜ À faire | Comparer avec `site.ts` |
| 4.3 | Inscription dans des annuaires de santé/bien-être (Doctolib, Pages Jaunes, annuaire de sophrologues) avec lien vers le site | ⬜ À faire | Backlinks locaux |
| 4.4 | Demander des avis Google aux clients | ⬜ À faire | Après création de la fiche |

## 5. Performance et qualité

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 5.1 | Test mobile-friendly + Core Web Vitals (PageSpeed Insights) | ⬜ À faire | Viser vert sur mobile |
| 5.2 | Test des résultats enrichis (Rich Results Test) sur accueil et FAQ | ⬜ À faire | Valide `LocalBusiness` et FAQ |
| 5.3 | Optimiser le poids des images (WebP, tailles adaptées) | 🟡 En cours | Photo en WebP déjà servie ; vérifier le reste |

## 6. Suivi après indexation

| # | Tâche | État | Détail |
|---|-------|------|--------|
| 6.1 | Contrôler l'indexation avec `site:labullecalme.fr` | ⬜ À faire | Délai habituel : quelques jours à quelques semaines |
| 6.2 | Suivre requêtes et positions dans Search Console | ⬜ À faire | Rapport « Performances » |
| 6.3 | Ajouter du contenu régulier (articles : stress, sommeil, respiration…) | ⬜ À faire | Facultatif, aide à se positionner sur plus de requêtes |
