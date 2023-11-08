import {
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import TextBase from '../components/ui/TextBase';
import {Colors, Fonts} from '../styles/Style';
import BackButton from '../components/ui/BackButton';
import RenderHtml from 'react-native-render-html';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  route: any;
}

const SoliguidePage = (props: Props) => {
  const [language, setLanguage] = React.useState<string>('fr');
  const [soliguide, setSoliguide] = React.useState<any>();
  const {structure} = props.route.params;

  React.useEffect(() => {
    const getContentFromCache = () => {
      return AsyncStorage.getItem('content').then(data => {
        if (data !== null) {
          setSoliguide(JSON.parse(data).soliguide);
        }
        AsyncStorage.getItem('language').then(language => {
          if (language !== null) {
            setLanguage(language);
          }
        });
      });
    };
    getContentFromCache();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton />
        <TextBase style={styles.title}>{structure.name}</TextBase>
        <RenderHtml
          tagsStyles={tagStyles}
          contentWidth={useWindowDimensions().width}
          source={{html: structure.description}}
        />
      </View>
      <View style={styles.containerMap}>
        {Platform.OS === 'ios' ? (
          <MapView
            style={styles.map}
            region={{
              latitude: structure.position.location.coordinates
                ? structure.position.location.coordinates[1]
                : structure.position.location[1],
              longitude: structure.position.location.coordinates
                ? structure.position.location.coordinates[0]
                : structure.position.location[0],
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: structure.position.location.coordinates
                  ? structure.position.location.coordinates[1]
                  : structure.position.location[1],
                longitude: structure.position.location.coordinates
                  ? structure.position.location.coordinates[0]
                  : structure.position.location[0],
              }}
            />
          </MapView>
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: structure.position.location.coordinates
                ? structure.position.location.coordinates[1]
                : parseFloat(structure.position.location[1]),
              longitude: structure.position.location.coordinates
                ? structure.position.location.coordinates[0]
                : parseFloat(structure.position.location[0]),
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: structure.position.location.coordinates
                  ? structure.position.location.coordinates[1]
                  : parseFloat(structure.position.location[1]),
                longitude: structure.position.location.coordinates
                  ? structure.position.location.coordinates[0]
                  : parseFloat(structure.position.location[0]),
              }}
            />
          </MapView>
        )}
      </View>
      <View style={styles.container}>
        <TextBase style={styles.title}>Services proposés</TextBase>

        {structure.services_all.map((service: any) => (
          <View style={styles.description}>
            <TextBase style={styles.category}>
              {soliguide?.categories[service.categorie]}
            </TextBase>
            {service.description ? (
              <RenderHtml
                tagsStyles={tagStyles}
                source={{html: service.description}}
              />
            ) : (
              <TextBase style={styles.tagStyles}>
                {soliguide?.directAccess}
              </TextBase>
            )}
          </View>
        ))}
      </View>
      <View style={{...styles.container, paddingBottom: 100}}>
        <TextBase style={styles.title}>Informations supplémentaires</TextBase>
        <TextBase>
          Ces informations sont fournies par Soliguide, la cartographie
          solidaire. Pour des informations plus complètes sur ce lieu, consultez{' '}
          <Text
            style={styles.link}
            onPress={() => {
              if (structure.lieu_id) {
                Linking.openURL(
                  `https://www.soliguide.fr/${language}/fiche/${structure.lieu_id}`,
                );
              }
            }}>
            Soliguide
          </Text>
          .
        </TextBase>
        <Pressable
          style={styles.imageContainer}
          onPress={() => {
            if (structure.lieu_id) {
              Linking.openURL(
                `https://www.soliguide.fr/${language}/fiche/${structure.lieu_id}`,
              );
            }
          }}>
          <Image
            source={require('../assets/images/soliguide.jpg')}
            style={styles.image}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SoliguidePage;

const tagStyles = {
  p: {
    fontSize: 16,
    marginBottom: 0,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundUrgence,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
    fontFamily: Fonts.primary,
  },
  tagStyles: {
    fontSize: 16,
    fontFamily: Fonts.primary,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: Fonts.primary,
    backgroundColor: '#ffffff',
    color: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  containerMap: {
    height: 300,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 20,
  },
  link: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  imageContainer: {
    width: '50%',
    height: '50%',
    marginTop: 10,
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
