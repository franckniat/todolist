# 🤝 Guide de Contribution

Merci de ton intérêt pour contribuer à TodoList App ! Ce guide t'aidera à démarrer rapidement.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- PostgreSQL
- pnpm (recommandé)
- Git

### Installation

1. **Fork le projet** sur GitHub
2. **Clone ton fork**
```bash
git clone https://github.com/TON-USERNAME/todolist.git
cd todolist
```

3. **Ajouter le repo original comme remote**
```bash
git remote add upstream https://github.com/franckniat/todolist.git
```

4. **Installer les dépendances**
```bash
pnpm install
```

5. **Configuration de l'environnement**
```bash
cp .env.example .env
```

Configurer les variables dans `.env` :
```env
DATABASE_URL="postgres://username:password@localhost:5432/todolist"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

6. **Configurer la base de données**
```bash
pnpm drizzle-kit generate
pnpm drizzle-kit push
```

7. **Lancer le projet**
```bash
pnpm dev
```

## 🛠️ Stack Technique

- **Frontend** : Next.js 15 (App Router), React 19, TypeScript
- **Styling** : Tailwind CSS, shadcn/ui
- **Base de données** : PostgreSQL + Drizzle ORM
- **Authentification** : Better Auth
- **Validation** : Zod
- **Linting/Formatting** : Biome

## 📁 Structure du Projet

```
src/
├── app/                    # App Router Next.js
│   ├── (auth)/            # Routes authentification
│   └── page.tsx           # Page d'accueil
├── components/            # Composants réutilisables
│   └── ui/               # Composants shadcn/ui
├── db/                   # Base de données
│   ├── schema.ts         # Schéma Drizzle
│   └── drizzle.ts        # Client DB
├── lib/                  # Utilitaires
└── actions/              # Server Actions
```

## 🔄 Workflow de Contribution

### 1. Créer une branche
```bash
git checkout -b feature/nom-de-ta-feature
# ou
git checkout -b fix/nom-du-bug
```

### 2. Développer
- Écris du code propre et documenté
- Suis les conventions du projet
- Teste tes modifications

### 3. Vérifier la qualité
```bash
# Linter et formater
pnpm lint
pnpm format

# Vérifier la compilation
pnpm build
```

### 4. Commit
```bash
git add .
git commit -m "feat: description de ta feature"
```

### 5. Push et Pull Request
```bash
git push origin feature/nom-de-ta-feature
```

Puis crée une Pull Request sur GitHub.

## 📝 Conventions de Code

### Messages de Commit
Utilise [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter la création de tâches
fix: corriger le bug d'authentification
docs: mettre à jour le README
style: formater le code
refactor: restructurer les composants
test: ajouter tests unitaires
```

### Code Style
- **TypeScript** obligatoire
- **Biome** pour le linting/formatting
- **Nommage** : camelCase pour les variables, PascalCase pour les composants
- **Imports** : utiliser les alias (`@/components`, `@/lib`)

### Composants React
```tsx
// ✅ Bon exemple
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export function TodoItem({ id, title, completed, onToggle }: TodoItemProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span className={completed ? "line-through" : ""}>{title}</span>
    </div>
  );
}
```

## 🎯 Zones de Contribution

### 🚀 Fonctionnalités Prioritaires
- [ ] CRUD des tâches (Create, Read, Update, Delete)
- [ ] Système de catégories/tags
- [ ] Filtres et recherche
- [ ] Interface utilisateur responsive
- [ ] Statistiques utilisateur

### 🐛 Bugs Connus
- Vérifier la liste des [Issues](https://github.com/franckniat/todolist/issues)

### 📚 Documentation
- Améliorer les commentaires dans le code
- Ajouter des exemples d'utilisation
- Traduire la documentation

### 🎨 Design/UX
- Améliorer l'interface utilisateur
- Optimiser l'expérience mobile
- Ajouter des animations

## 🧪 Tests

### Lancer les tests
```bash
# Tests unitaires (à venir)
pnpm test

# Tests e2e (à venir)
pnpm test:e2e
```

### Écrire des tests
- Utiliser **Vitest** pour les tests unitaires
- Utiliser **Playwright** pour les tests e2e
- Couvrir les fonctionnalités critiques

## 📋 Checklist Pull Request

Avant de soumettre ta PR, assure-toi que :

- [ ] Le code compile sans erreur (`pnpm build`)
- [ ] Le linter passe (`pnpm lint`)
- [ ] Le code est formaté (`pnpm format`)
- [ ] Les tests passent (quand ils existeront)
- [ ] La fonctionnalité est testée manuellement
- [ ] La documentation est mise à jour si nécessaire
- [ ] Le message de commit suit les conventions
- [ ] La PR a un titre et une description claire

## 🆘 Besoin d'Aide ?

- **Discord/Slack** : [Lien vers la communauté] (à définir)
- **Issues** : [GitHub Issues](https://github.com/franckniat/todolist/issues)
- **Email** : [Email de contact] (à définir)

## 📜 Code de Conduite

- Sois respectueux et bienveillant
- Aide les nouveaux contributeurs
- Propose des critiques constructives
- Garde un esprit collaboratif

---

**Merci pour ta contribution ! 🎉**

*Ensemble, créons la meilleure app de todolist !*