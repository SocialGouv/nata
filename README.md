# Nata

L'application mobile destinée aux femmes enceintes afin de les accompagner dans leur suivi de grossesse à travers un parcours éclairé et sécurisant.

### Developpement

##### Postgresql

Pour démarrer la base postgresql : 

```
cd compose
docker compose up -d
```

##### Strapi

Pour démarrer le backoffice strapi : 

```
cd strapi_BO
cp .env.example .env
npm i
npm run develop
