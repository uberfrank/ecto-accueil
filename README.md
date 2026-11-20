# ECTO — Guides et politiques

Site web statique (HTML + CSS, aucune dépendance de build) présentant les documents d'ECTO :

| Page | Source |
| --- | --- |
| `index.html` | Page de liens (style « linktree ») vers les outils d'ECTO |
| `documentation.html` | Accueil de la documentation |
| `guide-accueil.html` | Guide de l'accueil – v2.2 |
| `credits-benevolat.html` | Crédits bénévolat |
| `devenir-membre.html` | Devenir membre (ébauche) |
| `location-residents.html` | Politique de location pour les résidents (ébauche) |
| `evenements-communautaires.html` | Politique d'événements communautaires – Été 2026 |

Styles partagés : `assets/style.css`. Logo : `assets/logo-ecto.jpg`.

## Voir le site

Ouvrir `index.html` dans un navigateur, ou servir le dossier localement :

```bash
python3 -m http.server 8000
```

## Publier

Le site fonctionne tel quel sur n'importe quel hébergement statique (GitHub Pages, Netlify, etc.).
Pour GitHub Pages : *Settings → Pages → Deploy from a branch*, choisir la branche et le dossier racine.

## Modifier le contenu

Chaque page est un fichier HTML autonome. Le menu de navigation est répété dans chaque page :
si vous ajoutez une page, ajoutez aussi son lien dans le `<nav>` de toutes les autres.

## Liens à compléter

Dans `index.html`, les liens marqués `data-todo` sont provisoires (bordure pointillée) :

- `calendrier` : adresse de la page calendrier;
- `archie-android` : pointe vers la page de téléchargement d'Archie en attendant le lien Google Play exact.

Remplacez le `href` et retirez l'attribut `data-todo`.
