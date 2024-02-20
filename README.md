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
