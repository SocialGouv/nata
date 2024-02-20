# Nata

L'application mobile destinée aux femmes enceintes afin de les accompagner dans leur suivi de grossesse à travers un parcours éclairé et sécurisant.

L'application est construite avec [react native](https://reactnative.dev/docs/getting-started).

Le Backoffice est construit avec [Strapi](https://docs.strapi.io/dev-docs/intro).

## Developpement

### Postgresql

Pour démarrer la base postgresql :
```
cd compose
docker compose up -d
```

### Strapi
Pour démarrer le backoffice strapi :
```
cd strapi_BO
cp .env.example .env
npm i
npm run develop
```

Pour importer les données de strapi (contenus de l'application), récupérer dans un premier temps le fichier d'export en se rapprochant de l'équipe de la Fabrique, puis lancer la commande suivante : 
```
npm run strapi import -- -f /home/yoann/Téléchargements/nata-export.tar.gz 
```

### Application

##### Pré-requis :
1.  Xcode (à jour)
2.  Android Studio (à jour)
3.  VSCode (à jour)
4.  Terminal
5.  Installer CacaoPods

##### Étapes de configuration

1.  Installer les packages et les pods :

```tsx
npm i && cd ios && pod install && cd ..
```

2.  Lancer Xcode
    
    A. Selectionner le device sur lequel build l’application
    
    B. Build l’application

2.  Commandes utiles pour les lancements des émulateurs :
    
```tsx
npx react-native run-ios
```
```tsx
npx react-native run-android
```
