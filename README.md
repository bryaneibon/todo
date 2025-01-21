# 📝 TodoList Minimaliste
Une application TodoList élégante et minimaliste construite avec HTML, CSS, et JavaScript. Optimisée pour la productivité avec une interface utilisateur intuitive.

## ✨ Fonctionnalités

- ➕ Ajout de tâches en temps réel avec priorité et date d'échéance
- ✅ Marquage des tâches comme terminées
- 🗑️ Suppression des tâches
- 🎯 Gestion des priorités (Haute, Moyenne, Basse)
- 📅 Dates d'échéance pour les tâches
- 🔍 Filtrage des tâches :
  - Par statut (Toutes, En cours, Terminées)
  - Par priorité
- 🔄 Validation des tâches dupliquées
- 💾 Sauvegarde automatique dans le localStorage
- 📱 Design responsive et adaptatif
- 🎨 Interface utilisateur moderne et épurée

## 🚀 Démarrage Rapide
1. Clonez le repository :
```bash
git clone https://github.com/bryaneibon/todo.git
```

2. Ouvrez `index.html` dans votre navigateur préféré

C'est tout ! Aucune dépendance ou installation nécessaire.

## 💻 Technologies Utilisées

- HTML5 pour la structure
- CSS3 pour le style et les animations
- JavaScript (ES6+) pour la logique
- LocalStorage pour la persistance des données
- Bootstrap 5.3.3 pour le design responsive
- jQuery 3.7.1 pour la manipulation du DOM
- Bootstrap Icons pour les icônes

## 🎯 Utilisation

1. Entrez votre tâche dans le champ de saisie
2. Sélectionnez une date d'échéance (optionnel)
3. Choisissez une priorité (Haute, Moyenne, Basse)
4. Cliquez sur "Ajouter" ou appuyez sur Entrée
5. Pour marquer une tâche comme terminée, cochez la case à côté
6. Pour supprimer une tâche, cliquez sur le bouton "Supprimer"
7. Utilisez les filtres pour organiser l'affichage :
   - Filtrage par statut (Toutes, En cours, Terminées)
   - Filtrage par priorité
   - Tri automatique des tâches

## 🎨 Structure du Projet

```
todolist/
│
├── index.html         # Page principale
├── css/
│   └── styles.css    # Styles CSS
├── js/
│   └── index.js      # Logique JavaScript
├── images/
│   └── todo.png      # Icône du site
└── README.md         # Documentation
```

## 🔧 Personnalisation

Les couleurs du thème sont personnalisables via CSS :

```css
/* Couleurs des priorités */
.priority-high {
    border-left-color: #dc3545;
}

.priority-medium {
    border-left-color: #ffc107;
}

.priority-low {
    border-left-color: #198754;
}

/* Boutons et actions */
.todo-button {
    background: linear-gradient(135deg, #6a55e6 0%, #c655e6 100%);
}
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 👤 Auteur

**Bryan DIFFO**
- Email : [bryandiffo@gmail.com](mailto:bryandiffo@gmail.com)
- GitHub : [@bryaneibon](https://github.com/bryaneibon/)

## 🌟 Remerciements

- Inspiration du design : [TodoMVC](http://todomvc.com/)
- Icônes : [Bootstrap Icons](https://icons.getbootstrap.com/)

---
⭐️ Si vous trouvez ce projet utile, n'hésitez pas à lui donner une étoile !