# back_artiicles

- organisation en couches 

/Back_articles
/-- config
|   database.js                         # fichier de connexion à la base de données
/-- controllers 
|   articleController.js                # Contient la logique de traitement des requêtes HTTP
/-- routes
|   articleRoutes.js                    # fichier des routes CRUD 
/services
├── articleService.js                   # Logique métier pour les articles
├── articleRepository.js                # Accès aux données pour les articles
└── articleSql.js                       # Requêtes SQL spécifiques aux articles     