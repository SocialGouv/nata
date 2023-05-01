import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextBase from '../components/ui/TextBase';
import {Colors, Fonts} from '../styles/Style';
import BackButton from '../components/ui/BackButton';

const Legal = () => {
  return (
    <View style={styles.container}>
      <BackButton />
      <TextBase style={styles.title}>
        Mentions légales de l’application Nata
      </TextBase>
      <TextBase style={styles.subtitle}>Editeur de l’application</TextBase>
      <TextBase>
        L’application « Nata » est éditée par : L’Agence régionale de santé
        Île-de-France : Immeuble « Le Curve » 13 rue du Landy 93200 Saint-Denis
        France
      </TextBase>
      <TextBase>Téléphone: 01 44 02 00 00</TextBase>
      <TextBase style={styles.subtitle}>Directrice de la publication</TextBase>
      <TextBase>
        La directrice de publication est Madame Amélie Verdier, directrice
        générale de l’Agence régionale de santé (ARS) Île-de-France.
      </TextBase>
      <TextBase style={styles.subtitle}>Signaler un dysfonctionnement</TextBase>
      <TextBase>
        Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à
        un contenu ou une fonctionnalité de l’application, merci de nous en
        faire part : nata@fabrique.social.gouv.fr
      </TextBase>
    </View>
  );
};

export default Legal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
});
